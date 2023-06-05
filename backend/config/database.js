const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
	mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("MongoDB successfully connected"))
		.catch((err) => {
			console.log(`Error in DB connection`);
			console.error(err.message);
			process.exit(1);
		});
};

module.exports = dbConnect;
