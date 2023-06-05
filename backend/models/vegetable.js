const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	veg_id: {
		type: String,
		required: true,
	},
	veg_name: {
		type: String,
		required: true,
	},
	rate: [{
        type: Number,
        // ref: "dataentries",
    }]
});

module.exports = mongoose.model("vegetables", userSchema);
