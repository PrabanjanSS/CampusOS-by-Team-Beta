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



        "Faculty"

    ),

    updateBlog

);


router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "Club Lead",



        "Faculty"

    ),

    deleteBlog

);

router.put(

    "/approve/:id",

    protect,

    authorizeRoles(

        "Faculty"

    ),

    approveBlog

);



router.put(

    "/reject/:id",

    protect,

    authorizeRoles(

        "Faculty"

    ),

    rejectBlog

);


module.exports=router;