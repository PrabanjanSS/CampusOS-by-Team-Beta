const express = require("express");

const router = express.Router();

const protect =
require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");


const{

    createReport,
    getAllReports,
    getSingleReport,
    getPendingReports,
    approveReport,
    rejectReport

}=require("../controllers/reportController");



// CREATE REPORT

router.post(

    "/",

    protect,

    authorizeRoles(

        "Club Lead"

    ),

    createReport

);


// GET ALL REPORTS

router.get(

    "/",

    protect,

    authorizeRoles(

        "Faculty",

        "Admin"

    ),

    getAllReports

);


// GET PENDING REPORTS

router.get(

    "/pending",

    protect,

    authorizeRoles(

        "Faculty",

        "Admin"

    ),

    getPendingReports

);


// GET SINGLE REPORT

router.get(

    "/:id",

    protect,

    authorizeRoles(

        "Faculty",

        "Admin",

        "Club Lead"

    ),

    getSingleReport

);


// APPROVE REPORT

router.put(

    "/approve/:id",

    protect,

    authorizeRoles(

        "Faculty",

        "Admin"

    ),

    approveReport

);


// REJECT REPORT

router.put(

    "/reject/:id",

    protect,

    authorizeRoles(

        "Faculty",

        "Admin"

    ),

    rejectReport

);


module.exports = router;