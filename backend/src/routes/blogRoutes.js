const express = require("express");

const router = express.Router();
const authorizeRoles =
require("../middlewares/roleMiddleware");
const protect = require("../middlewares/authMiddleware");



const{

    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    approveBlog,
    rejectBlog

}=require("../controllers/blogController");



router.post(

    "/",

    protect,

authorizeRoles(

    "Member",

    "Club Lead",

    "Faculty",

    "Admin"

),

    createBlog

);


router.get(

    "/",

    getAllBlogs

);


router.get(

    "/:id",

    getSingleBlog

);


router.put(

    "/:id",

    protect,

    authorizeRoles(

        "Club Lead",

        "Admin",

        "Faculty"

    ),

    updateBlog

);


router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "Club Lead",

        "Admin",

        "Faculty"

    ),

    deleteBlog

);

router.put(

    "/approve/:id",

    protect,

    authorizeRoles(

        "Faculty",

        "Admin"

    ),

    approveBlog

);



router.put(

    "/reject/:id",

    protect,

    authorizeRoles(

        "Faculty",

        "Admin"

    ),

    rejectBlog

);


module.exports=router;