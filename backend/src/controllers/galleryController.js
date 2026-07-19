const Gallery = require("../models/Gallery");


const createGallery = async(req,res)=>{

    try{

        const gallery = await Gallery.create({

            ...req.body,

            uploadedBy:req.user._id

        });


        return res.status(201).json({

            success:true,
            gallery

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const getAllGalleryImages = async(req,res)=>{

    try{

        const gallery = await Gallery.find();


        return res.status(200).json({

            success:true,
            gallery

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const getSingleImage = async(req,res)=>{

    try{

        const image = await Gallery.findById(

            req.params.id

        );


        return res.status(200).json({

            success:true,
            image

        });

    }

    catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const deleteImage = async(req,res)=>{

    try{

        await Gallery.findByIdAndDelete(

            req.params.id

        );


        return res.status(200).json({

            success:true,
            message:"Image Deleted."

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

    createGallery,
    getAllGalleryImages,
    getSingleImage,
    deleteImage

};