const User = require("../models/User");


const getAllMembers = async(req,res)=>{

    try{

        const members = await User.find()
        .select("-password");


        return res.status(200).json({

            success:true,
            members

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const getSingleMember = async(req,res)=>{

    try{

        const member = await User.findById(

            req.params.id

        ).select("-password");


        return res.status(200).json({

            success:true,
            member

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const updateMember = async(req,res)=>{


    try{


        const member =
        await User.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        ).select("-password");


        return res.status(200).json({

            success:true,
            member

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const deleteMember = async(req,res)=>{

    try{

        await User.findByIdAndDelete(

            req.params.id

        );


        return res.status(200).json({

            success:true,
            message:"Member Deleted."

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

    getAllMembers,
    getSingleMember,
    updateMember,
    deleteMember

};