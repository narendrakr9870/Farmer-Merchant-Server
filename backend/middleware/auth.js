const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try{

        const token = req.cookies.token;
        
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token missing, Please login to access',
            });
        }

        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
        }
        catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    } 
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token'
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try{
        if(req.user.role !== "admin") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for admin',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'Role is not matching'
        })
    }
}

exports.isFarmer = (req, res, next) => {
    try{
        if(req.user.role !== "farmer") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for farmer',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'Role is not matching',
        })
    }
}

exports.isMerchant = (req, res, next) => {
    try{
        if(req.user.role !== "merchant") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for merchant',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'Role is not matching',
        })
    }
}