const Blog = require("../models/Blog");


const createBlog = async (req, res) => {
    try {
        let status = "Pending";

        if (
            req.user.role === "lead" ||
            req.user.role === "faculty"
        ) {
            status = "Approved";
        }

        const blog = await Blog.create({
            ...req.body,
            createdBy: req.user._id,
            status
        });

        return res.status(201).json({
            success: true,
            blog
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const getAllBlogs = async(req,res)=>{

    try{

        const blogs = await Blog.find();

        return res.status(200).json({

            success:true,
            blogs

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const getSingleBlog = async(req,res)=>{

    try{

        const blog = await Blog.findById(
            req.params.id
        );

        return res.status(200).json({

            success:true,
            blog

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const updateBlog = async(req,res)=>{

    try{

        const blog = await Blog.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );


        return res.status(200).json({

            success:true,
            blog

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};

const approveBlog = async(req,res)=>{

    try{

        const blog = await Blog.findById(

            req.params.id

        );


        if(!blog){

            return res.status(404).json({

                success:false,

                message:"Blog not found."

            });

        }


        blog.status = "Approved";


        blog.facultyRemarks =

        req.body.facultyRemarks || "";


        await blog.save();


        return res.status(200).json({

            success:true,

            message:"Blog Approved.",

            blog

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



const rejectBlog = async(req,res)=>{

    try{


        const blog = await Blog.findById(

            req.params.id

        );


        if(!blog){

            return res.status(404).json({

                success:false,

                message:"Blog not found."

            });

        }


        blog.status = "Rejected";


        blog.facultyRemarks =

        req.body.facultyRemarks || "";


        await blog.save();


        return res.status(200).json({

            success:true,

            message:"Blog Rejected.",

            blog

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

const deleteBlog = async(req,res)=>{

    try{

        await Blog.findByIdAndDelete(

            req.params.id

        );


        return res.status(200).json({

            success:true,
            message:"Blog Deleted"

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



module.exports={

    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    approveBlog,
    rejectBlog

};