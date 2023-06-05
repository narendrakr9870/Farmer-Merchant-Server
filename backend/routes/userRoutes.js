const express = require("express");
const router = express.Router();

const {login, signup, logout, forgotPassword, updatePassword, createUser} = require("../controller/userController");
const {auth, isAdmin, isFarmer, isMerchant} = require("../middleware/auth");
const {createVegetable, getDataEntry, dataEntry, updateEntry, viewSells, viewBills} = require('../controller/dataController');

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.put("/forgotPassword", forgotPassword);
router.put("/updatePassword", auth, updatePassword);

//Protected Route
router.get("/admin", auth, isAdmin, getDataEntry);

router.post("/admin/createVegetable", auth, isAdmin, createVegetable);

router.post("/admin/createUser", auth, isAdmin, createUser);

router.post("/admin/dataEntry", auth, isAdmin, dataEntry);

router.put("/admin/updateEntry/:id", auth, isAdmin, updateEntry);

router.get("/admin/sells", auth, isAdmin, viewSells);

router.get("/admin/bills", auth, isAdmin, viewBills);

router.get("/farmer", auth, isFarmer, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route of Farmers',
    });
});

router.get("/merchant", auth, isMerchant, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route of Merchants',
    });
});

module.exports = router;
