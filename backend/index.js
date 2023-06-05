const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/database");
const vegRoutes = require("./routes/vegetableRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
  })
);
// Middleware
app.use(express.json());

app.use("/api", vegRoutes);
app.use("/api", userRoutes);

// CORS Configuration
app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

dbConnection();

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});
