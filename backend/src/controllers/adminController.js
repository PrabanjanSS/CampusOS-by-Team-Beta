const User = require("../models/User");
const Event = require("../models/Event");
const Blog = require("../models/Blog");
const Project = require("../models/Project");


const getDashboardStats = async(req,res)=>{


    try{


        const users =
        await User.countDocuments();


        const events =
        await Event.countDocuments();


        const blogs =
        await Blog.countDocuments();


        const projects =
        await Project.countDocuments();



        return res.status(200).json({

            success:true,

            totalUsers:users,

            totalEvents:events,

            totalBlogs:blogs,

            totalProjects:projects

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

    getDashboardStats

};