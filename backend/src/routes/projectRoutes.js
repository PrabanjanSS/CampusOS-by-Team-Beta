const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const authorizeRoles = require("../middlewares/roleMiddleware");

const {

    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
    approveProject,
    rejectProject,
    getPendingProjects

} = require("../controllers/projectController");


// CREATE PROJECT
router.post(

    "/",

    protect,

    authorizeRoles(

        "Club Lead",
        "Faculty"
    ),

    createProject

);


// GET ALL APPROVED PROJECTS
router.get(

    "/",

    getAllProjects

);

router.get(

    "/pending",

    protect,

    authorizeRoles(

        "Faculty"

    ),

    getPendingProjects

);


// GET SINGLE PROJECT
router.get(

    "/:id",

    getSingleProject

);


// UPDATE PROJECT
router.put(

    "/:id",

    protect,

    authorizeRoles(
        "Club Lead",
        "Faculty"
    ),

    updateProject

);


// DELETE PROJECT
router.delete(

    "/:id",

    protect,

    authorizeRoles(
        "Faculty"
    ),

    deleteProject

);


// APPROVE PROJECT
router.put(

    "/approve/:id",

    protect,

    authorizeRoles(
        "Faculty"
    ),

    approveProject

);


// REJECT PROJECT
router.put(

    "/reject/:id",

    protect,

    authorizeRoles(
        "Faculty"
    ),

    rejectProject

);




module.exports = router;