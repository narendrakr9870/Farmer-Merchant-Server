const mongoose = require("mongoose");
const validator = require("validator");
// const nodemailer = require("nodemailer");

const userSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:[true,"Please enter the userid"],
        maxLength:[10,"Id cannot exceed 10 characters"],
        minLength:[3,"Id should be have more than 4 characters"]
    },
    name:{
        type:String,
        required:[true,"Please enter the name"],
        maxLength:[30,"Name cannot exceed 30 character"],
        minLength:[4,"Name should be have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter the email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter the password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false
    },
    contact:{
        type:Number,
        maxLength:[10,"Number cannot exceed 10 digits"],
        minLength:[10,"Number cannot be less than 10 digits"]
    },
    role:{
        type:String,
        required: true,
        enum:["admin", "farmer", "merchant"]
    },
    address:{
        type:String,
        maxLength:[30,"Name cannot exceed 30 character"],
        default: ""
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("users", userSchema);