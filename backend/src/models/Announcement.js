const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(

    {

        title:{
            type:String,
            required:true
        },

        description:{
            type:String,
            required:true
        },

        priority:{
            type:String,
            enum:["Low","Medium","High"],
            default:"Low"
        },

        clubName:{
            type:String,
            required:true
        },

        expiresAt:{
            type:Date
        },

        postedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }

    },

    {
        timestamps:true
    }

);


const Announcement = mongoose.model(

    "Announcement",

    announcementSchema

);


module.exports = Announcement;