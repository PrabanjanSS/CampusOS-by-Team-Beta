const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");


const{

    getAllMembers,
    getSingleMember,
    updateMember,
    deleteMember,
    getClubMembers

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

        "faculty"

    ),

    updateMember

);


router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "faculty"

    ),

    deleteMember

);

router.get(

    "/club/:club",

    getClubMembers

);


module.exports = router;