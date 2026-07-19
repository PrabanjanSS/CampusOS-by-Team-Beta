const mongoose = require("mongoose");


const gallerySchema = new mongoose.Schema(

    {

        title:{
            type:String,
            required:true
        },

        description:{
            type:String
        },

        image:{
            type:String,
            required:true
        },

        clubName:{
            type:String,
            required:true
        },

        uploadedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }

    },

    {
        timestamps:true
    }

);


const Gallery = mongoose.model(

    "Gallery",

    gallerySchema

);


module.exports = Gallery;