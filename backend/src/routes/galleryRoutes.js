const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const authorizeRoles = require("../middlewares/roleMiddleware");


const{

    createGallery,
    getAllGalleryImages,
    getSingleImage,
    deleteImage

}=require("../controllers/galleryController");



router.post(

    "/",

    protect,

        authorizeRoles(

        "Club Lead",

        "Admin"

    ),

    createGallery

);


router.get(

    "/",

    getAllGalleryImages

);


router.get(

    "/:id",

    getSingleImage

);


router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "Club Lead",

        "Admin"

    ),

    deleteImage

);


module.exports = router;