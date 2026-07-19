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

   

        "Faculty"

    ),

    updateAnnouncement

);


router.delete(

    "/:id",

    protect,

    authorizeRoles(

 

        "Faculty"

    ),

    deleteAnnouncement

);


module.exports = router;