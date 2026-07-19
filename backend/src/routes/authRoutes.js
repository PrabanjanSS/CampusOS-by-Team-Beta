const express = require("express");

const router = express.Router();

const protect =

require("../middlewares/authMiddleware");


const {

    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    getCurrentUser,
    changePassword

} = require("../controllers/authController");


router.post(
    "/register",
    registerUser
);


router.post(

    "/login",

    loginUser

);

router.get(

    "/profile",

    protect,

    getProfile

);

router.put(

    "/update-profile",

    protect,

    updateProfile

);

router.get(

    "/me",

    protect,

    getCurrentUser

);

router.put(

    "/change-password",

    protect,

    changePassword

);

module.exports = router;