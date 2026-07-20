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
    deleteEvent,
    registerForEvent

} = require("../controllers/eventController");


const protect =
require("../middlewares/authMiddleware");


router.post(

    "/",

    protect,

    authorizeRoles(

        "lead"

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

        "lead"

    ),

    updateEvent

);



router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "faculty"

    ),

    deleteEvent

);

router.post(

    "/register/:id",

    protect,

    authorizeRoles(

        "member",

        "lead",

        "faculty"

    ),

    registerForEvent

);


module.exports = router;