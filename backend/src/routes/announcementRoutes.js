const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");


const{

    createAnnouncement,
    getAllAnnouncements,
    getSingleAnnouncement,
    updateAnnouncement,
    deleteAnnouncement

}=require("../controllers/announcementController");



router.post(

    "/",

    protect,

    authorizeRoles(

        "lead",

        "faculty"

    ),

    createAnnouncement

);


router.get(

    "/",

    getAllAnnouncements

);


router.get(

    "/:id",

    getSingleAnnouncement

);


router.put(

    "/:id",

    protect,

    authorizeRoles(

        "lead",

   

        "faculty"

    ),

    updateAnnouncement

);


router.delete(

    "/:id",

    protect,

    authorizeRoles(



        "faculty"

    ),

    deleteAnnouncement

);


module.exports = router;