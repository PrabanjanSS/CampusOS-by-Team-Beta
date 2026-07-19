const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");


const{

    getAllMembers,
    getSingleMember,
    updateMember,
    deleteMember

}=require("../controllers/memberController");



router.get(

    "/",

    getAllMembers

);


router.get(

    "/:id",

    getSingleMember

);


router.put(

    "/:id",

    protect,

    authorizeRoles(

        "Admin"

    ),

    updateMember

);


router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "Admin"

    ),

    deleteMember

);


module.exports = router;