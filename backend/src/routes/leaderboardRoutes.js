const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");


const{

    createLeaderboard,
    getLeaderboard,
    updateLeaderboard,
    

}=require("../controllers/leaderboardController");



router.post(

    "/",

    protect,

    authorizeRoles(

        "Admin"

    ),

    createLeaderboard

);


router.get(

    "/",

    getLeaderboard

);


router.put(

    "/:id",

    protect,

    authorizeRoles(

        "Admin"

    ),

    updateLeaderboard

);




module.exports = router;