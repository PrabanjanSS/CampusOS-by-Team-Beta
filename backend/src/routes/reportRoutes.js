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

        "lead"

    ),

    createReport

);


// GET ALL REPORTS

router.get(

    "/",

    protect,

    authorizeRoles(

        "faculty"

    ),

    getAllReports

);


// GET PENDING REPORTS

router.get(

    "/pending",

    protect,

    authorizeRoles(

        "faculty"

    ),

    getPendingReports

);


// GET SINGLE REPORT

router.get(

    "/:id",

    protect,

    authorizeRoles(

        "faculty",


        "lead"

    ),

    getSingleReport

);


// APPROVE REPORT

router.put(

    "/approve/:id",

    protect,

    authorizeRoles(

        "faculty"

    ),

    approveReport

);


// REJECT REPORT

router.put(

    "/reject/:id",

    protect,

    authorizeRoles(

        "faculty"

    ),

    rejectReport

);


module.exports = router;