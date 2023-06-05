const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

exports.createUser = async (req, res) => {
    try{
        //get data
        const {userid, name, email, role, contact, address} = req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 10;
        let password = "";

        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
        }

        const message = `Congratulations, You are now registered as a ${role}. \n\n Your password is :- ${password}  \n\n Please use this password to access your account. \n\n\n Thank you`;

        
        //secure password
        let hashedPassword;

        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password',
            });
        }

        //create entry for User
        const user = await User.create({
            userid,name,email,password:hashedPassword,role,contact, address
        })
        
        if(user){
            try{
                await sendEmail({
                    email: email,
                    subject: `New Registration`,
                    message,
                });
            }
            catch(error){
                return res.status(500).json({
                    success:false,
                    message:'Error in sending email',
                });
            }
        }

        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
};

exports.login = async (req,res) => {
    try {

        //data fetch
        const {email, password, role} = req.body;
        //validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'Please fill all the details!',
            });
        }

        //check for registered user
        let user = await User.findOne({email}).select("+password");
        //if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        if(user.role !== role){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };
        //verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password) ) {
            //password match
            let token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

                                
            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully',
            });

        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success:false,
                message:"Invalid credentials",
            });
        }
        
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });

    }
}

exports.logout = async (req, res) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
    
}

exports.forgotPassword = async (req, res) => {
    let user = await User.findOne({email: req.body.email});
        //if not a registered user
    if(!user) {
        return res.status(401).json({
            success:false,
            message:'User is not registered',
        });
    }

    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 10;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }

    const message = `Your new password is :- \n\n ${password}  \n\n Please use this password to login and then update it.\n\n Thank you`;

    try {
        await sendEmail({
        email: user.email,
        subject: `Forgot Password`,
        message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });

    let hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    } catch (error) {
    return error.message;
  }
}

exports.updatePassword = async (req, res) => {
    try{
        const {password, password1, password2} = req.body;
        if(password1 !== password2) {
            return res.status(400).json({
                success:false,
                message:'New password and confirm new password are different',
            });
        }

        let user = await User.findById(req.user.id).select("+password");

        if(await bcrypt.compare(password,user.password) ) {
            
            let hashedPassword = await bcrypt.hash(password2, 10);
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({
                success:true,
                message:'Password updated successfully',
            });
        }
        
        else {
            return res.status(403).json({
                success:false,
                message:"Invalid password",
            });
        }
    }
    catch (error) {
        return error.message;
    }
}

exports.signup = async (req,res) => {
    try{
        //get data
        const {userid, name, email, password, role, contact, address} = req.body;
        //check if user already exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password',
            });
        }

        //create entry for User
        const user = await User.create({
            userid,name,email,password:hashedPassword,role,contact, address
        })

        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
        });

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
        });
    }
}