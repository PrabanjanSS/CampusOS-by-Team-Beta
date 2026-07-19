const express = require("express");

const router = express.Router();

const protect =
require("../middlewares/authMiddleware");

const authorizeRoles =
require("../middlewares/roleMiddleware");


const{

    createPoll,
    getAllPolls,
    getSinglePoll,
    votePoll,
    updatePoll,
    deletePoll

}=require("../controllers/pollController");



// CREATE POLL

router.post(

    "/",

    protect,

    authorizeRoles(

        "Faculty",

        "Club Lead"

    ),

    createPoll

);


// GET ALL POLLS

router.get(

    "/",

    getAllPolls

);


// GET SINGLE POLL

router.get(

    "/:id",

    getSinglePoll

);


// VOTE

router.put(

    "/vote/:id",

    protect,

    authorizeRoles(

        "Member",

        "Club Lead",

        "Faculty"

    ),

    votePoll

);


// UPDATE POLL

router.put(

    "/:id",

    protect,

    authorizeRoles(

        "Faculty"

    ),

    updatePoll

);


// DELETE POLL

router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "Faculty"

    ),

    deletePoll

);


module.exports = router;