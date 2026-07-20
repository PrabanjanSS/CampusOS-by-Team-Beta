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

        "lead"

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

        "lead"

    ),

    deleteImage

);


module.exports = router;