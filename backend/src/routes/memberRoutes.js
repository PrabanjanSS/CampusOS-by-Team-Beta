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

        "Faculty"

    ),

    updateMember

);


router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "Faculty"

    ),

    deleteMember

);


module.exports = router;