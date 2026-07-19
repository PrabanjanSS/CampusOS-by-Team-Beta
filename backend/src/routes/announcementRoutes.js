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

        "Club Lead",

        "Admin",
        "Faculty"

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

        "Club Lead",

        "Admin",

        "Faculty"

    ),

    updateAnnouncement

);


router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "Admin",

        "Faculty"

    ),

    deleteAnnouncement

);


module.exports = router;