const vegetables = require("../models/vegetable");
exports.getVegetables = async (req, res) => {
	try {

		const vegData = await vegetables.find({});
		
		res.status(200).json({ success: true, data: vegData });
		
	} 
	catch (error) {
		res.status(500).json({ success: false, error: error });
	}
};
