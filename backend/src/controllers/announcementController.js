const Announcement = require("../models/Announcement");


const createAnnouncement = async(req,res)=>{

    try{

        const announcement = await Announcement.create({

            ...req.body,

            postedBy:req.user._id

        });


        return res.status(201).json({

            success:true,
            announcement

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const getAllAnnouncements = async(req,res)=>{

    try{

        const announcements = await Announcement.find();


        return res.status(200).json({

            success:true,
            announcements

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const getSingleAnnouncement = async(req,res)=>{

    try{

        const announcement = await Announcement.findById(

            req.params.id

        );


        return res.status(200).json({

            success:true,
            announcement

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const updateAnnouncement = async(req,res)=>{

    try{

        const announcement =
        await Announcement.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );


        return res.status(200).json({

            success:true,
            announcement

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const deleteAnnouncement = async(req,res)=>{

    try{


        await Announcement.findByIdAndDelete(

            req.params.id

        );


        return res.status(200).json({

            success:true,
            message:"Announcement Deleted."

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

    createAnnouncement,
    getAllAnnouncements,
    getSingleAnnouncement,
    updateAnnouncement,
    deleteAnnouncement

};