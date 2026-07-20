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

    "member",

    "lead",

    "faculty"

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

        "lead",


        "faculty"

    ),

    updateBlog

);


router.delete(

    "/:id",

    protect,

    authorizeRoles(

        "lead",


        "faculty"

    ),

    deleteBlog

);

router.put(

    "/approve/:id",

    protect,

    authorizeRoles(

        "faculty"

    ),

    approveBlog

);



router.put(

    "/reject/:id",

    protect,

    authorizeRoles(

        "faculty"

    ),

    rejectBlog

);


module.exports=router;