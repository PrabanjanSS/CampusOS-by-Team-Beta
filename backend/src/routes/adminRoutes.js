const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const{

    getDashboardStats

}=require("../controllers/adminController");


router.get(

    "/dashboard",

    protect,

    getDashboardStats

);


module.exports = router;