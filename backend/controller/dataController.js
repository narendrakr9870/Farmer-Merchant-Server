const entries = require("../models/dataEntry");
const vegetables = require("../models/vegetable");
const users = require("../models/user");

exports.dataEntry = async (req,res) => {
    try{
        //get data
        const {f_id, veg_id, weight, rate, m_id} = req.body;
        
        if(!f_id || !veg_id || !weight || !rate || !m_id){
            return res.status(400).json({
                success:false,
                message:'Please fill all the fields!',
            });
        }    
        
        try{

            const veg = await vegetables.findOne({veg_id: veg_id});
            const farmer = await users.findOne({userid: f_id});
            const merchant = await users.findOne({userid: m_id});
            
            if(!veg){
                return res.status(400).json({
                    success:false,
                    message:'This vegetable is not registered'
                })
            }
            else if(!farmer){
                return res.status(400).json({
                    success:false,
                    message:'This farmer is not registered'
                })
            }
            else if(!merchant){
                return res.status(400).json({
                    success:false,
                    message:'This merchant is not registered'
                })
            }

            const savedData = await entries.create({
                f_id, veg_id, weight, rate, m_id
            })

            await entries.findByIdAndUpdate(savedData._id, {vegetable: veg.veg_name, farmer: farmer.name, merchant: merchant.name});

            const updateVegetable = await vegetables.findByIdAndUpdate(veg._id, {$push: {rate: savedData.rate} }, {new :true});
        
            return res.status(200).json({
            success:true,
            data:savedData,
            message:'One row inserted'
            });
        }
        catch(error){
            return res.status(400).json({
                success: false,
                messsage:'Unable to insert in db'
            })
        }
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Error in data insertion',
        });
    }
}

exports.updateEntry = async (req,res) => {
    try{

        const id = req.params.id;
        //get data
        const {f_id, veg_id, weight, rate, m_id} = req.body;
        
        //update dataEntry
        const savedData = await entries.findByIdAndUpdate(
            {_id:id},
            {f_id, veg_id, weight, rate, m_id}
        )

        return res.status(200).json({
            success:true,
            message:'Data updated'
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Error in data updation',
        });
    }
}

exports.getDataEntry = async (req,res) => {
    try {
		const entryData = await entries.find({});
		res.status(200).json({ success: true, data: entryData });
	} 
	catch (error) {
		res.status(500).json({ success: false, error: error });
	}
}

exports.viewSells = async (req,res) => {
    try {
		const farmerData = await entries.find({});
		res.status(200).json({ success: true, data: farmerData });
	} 
	catch (error) {
		res.status(500).json({ success: false, error: error });
	}
}

exports.viewBills = async (req,res) => {
    try {
		const merchantData = await entries.find({});
		res.status(200).json({ success: true, data: merchantData });
	}
	catch (error) {
		res.status(500).json({ success: false, error: error });
	}
}

exports.createVegetable = async (req, res) => {
    try{
        //get data
        const {veg_id, veg_name} = req.body;

        //check if vegetable already exists
        const existingVegetable = await vegetables.findOne({veg_name});

        if(existingVegetable){
            return res.status(400).json({
                success:false,
                message:'Vegetable already Exists',
            });
        }

        const addVegetable = new vegetables({
            veg_id, veg_name
        });

        //create entry for Vegetable
        const saveVeg = await addVegetable.save();
        
        return res.status(200).json({
            success:true,
            saveVeg
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'Please try again later',
        });
    }
};