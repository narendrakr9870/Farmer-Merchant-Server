const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    f_id:{
        type:String,
        required:[true,"Please enter farmer_id"],
        maxLength:[5,"Farmer_id cannot exceed 5 characters"]
    },
    veg_id:{
        type:String,
        required:[true,"Please enter vegetable_id"],
        maxLength:[5,"Vegtable_id cannot exceed 5 characters"]
    },
    weight:{
        type:Number,
        required:[true,"Please enter weight"],
    },
    rate:{
        type:Number,
        required:[true,"Please enter rate"],
    },
    m_id:{
        type:String,
        required:[true,"Please enter the merchant_id"],
        maxLength:[5,"Farmer_id cannot exceed 5 characters"]
    },
    f_pay_status:{
        type:Boolean,
        default:0 
    },
    m_pay_status:{
        type:Boolean,
        default:0
    },
    vegetable:{
        type:String
    },
    farmer:{
        type:String
    },
    merchant:{
        type:String
    },
    createdAt:{
        type: Date,
        default:Date.now()
    }
    // veg: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "vegetables",
    // }],
    // user: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "users",
    // }],
    // advance: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "advances",
    // }],
    // payment: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "payments",
    // }],
});

module.exports = mongoose.model("dataentries", dataSchema);