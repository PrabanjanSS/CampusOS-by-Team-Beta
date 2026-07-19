const Project = require("../models/Project");



const createProject = async(req,res)=>{

    try{

let status = "Pending";


if(

    req.user.role==="Faculty"



){

    status="Approved";

}


const project = await Project.create({

    ...req.body,

    createdBy:req.user._id,

    status

});


        return res.status(201).json({

            success:true,
            project

        });


    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const getAllProjects = async(req,res)=>{

    try{

        const projects = await Project.find({

    status:"Approved"

});


        return res.status(200).json({

            success:true,
            projects

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const getSingleProject = async(req,res)=>{

    try{

        const project = await Project.findById(
            req.params.id
        );


        return res.status(200).json({

            success:true,
            project

        });


    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const updateProject = async(req,res)=>{


    try{


        const project = await Project.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );


        return res.status(200).json({

            success:true,
            project

        });


    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }


};



const deleteProject = async(req,res)=>{


    try{


        await Project.findByIdAndDelete(

            req.params.id

        );


        return res.status(200).json({

            success:true,
            message:"Project Deleted."

        });


    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }


};

const approveProject = async(req,res)=>{


    try{


        const project =
        await Project.findById(

            req.params.id

        );


        project.status="Approved";


        project.approvedBy=

        req.user._id;


        await project.save();


        return res.status(200).json({

            success:true,

            message:"Project Approved."

        });


    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

const rejectProject = async(req,res)=>{


    try{


        const{

            facultyRemarks

        }=req.body;


        const project =
        await Project.findById(

            req.params.id

        );


        project.status="Rejected";


        project.remarks=

        facultyRemarks;


        project.approvedBy=

        req.user._id;


        await project.save();


        return res.status(200).json({

            success:true,

            message:"Project Rejected."

        });


    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }


};

const getPendingProjects = async(req,res)=>{

try{

    const projects =

    await Project.find({

        status:"Pending"

    });


    return res.status(200).json({

        success:true,

        projects

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

    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
    approveProject,
    rejectProject,
    getPendingProjects

};