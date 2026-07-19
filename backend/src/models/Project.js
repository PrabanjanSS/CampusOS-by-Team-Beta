const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(

    {

        title:{
            type:String,
            required:true
        },

        description:{
            type:String,
            required:true
        },

        githubLink:{
            type:String
        },

        projectLink:{
            type:String
        },

        contributors:[
            {
                type:String
            }
        ],

        tags:[
            {
                type:String
            }
        ],

        images:[
            {
                type:String
            }
        ],

        likes:{
            type:Number,
            default:0
        },

        views:{
            type:Number,
            default:0
        },

status:{

    type:String,

    enum:[

        "Pending",

        "Approved",

        "Rejected"

    ],

    default:"Pending"

},


approvedBy:{

    type:mongoose.Schema.Types.ObjectId,

    ref:"User"

},


facultyRemarks:{

    type:String,

    default:""

},

        clubName:{
            type:String,
            required:true
        },

        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }

    },

    {
        timestamps:true
    }

);


const Project = mongoose.model(
    "Project",
    projectSchema
);


module.exports = Project;