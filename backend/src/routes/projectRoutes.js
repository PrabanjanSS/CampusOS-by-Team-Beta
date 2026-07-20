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

        "lead",
        "faculty"
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

        "faculty"

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
        "lead",
        "faculty"
    ),

    updateProject

);


// DELETE PROJECT
router.delete(

    "/:id",

    protect,

    authorizeRoles(
        "faculty"
    ),

    deleteProject

);


// APPROVE PROJECT
router.put(

    "/approve/:id",

    protect,

    authorizeRoles(
        "faculty"
    ),

    approveProject

);


// REJECT PROJECT
router.put(

    "/reject/:id",

    protect,

    authorizeRoles(
        "faculty"
    ),

    rejectProject

);




module.exports = router;