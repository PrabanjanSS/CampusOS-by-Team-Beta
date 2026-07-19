const express =
require("express");


const router =
express.Router();

const authorizeRoles =
require("../middlewares/roleMiddleware");


const{

    createEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent

} = require("../controllers/eventController");


const protect =
require("../middlewares/authMiddleware");


router.post(

    "/",

    protect,

    authorizeRoles(

        "Club Lead"

    ),

    createEvent

);


router.get(

    "/",

    getAllEvents

);

router.get(

    "/:id",

    getSingleEvent

);



router.put(

    "/:id",

    protect,

    authorizeRoles(

        "Club Lead"

    ),

    updateEvent

);



router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "Faculty"

    ),

    deleteEvent

);


module.exports = router;