const ErrorHander = require("../utils/errorhander");

module.exports = (err,request,response,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //wrong mongodb id error
    if(err.name === "CastError") {
        const message = `Resource not found. Invaid: ${err.path}`;
        err = new ErrorHander(message,400);
    }

    // Mongoose duplicate key error

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message,400);
    }

    // Wrong JWT error

    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, try again `;
        err = new ErrorHander(message,400);
    }

    // JWT Expire Error

    if(err.name === "TokenExpireError"){
        const message = `Json Web Token is Expired, try again `;
        err = new ErrorHander(message,400);
    }


    response.status(err.statusCode).json({
        success:false,
        error:err.message,
    });
};