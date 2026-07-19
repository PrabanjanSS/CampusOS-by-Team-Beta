const mongoose = require("mongoose");


const reportSchema = new mongoose.Schema(

    {

        title:{

            type:String,

            required:true

        },

        description:{

            type:String,

            required:true

        },

        clubName:{

            type:String,

            required:true

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

        facultyRemarks:{

            type:String,

            default:""

        },

        approvedBy:{

            type:mongoose.Schema.Types.ObjectId,

            ref:"User"

        },

        submittedBy:{

            type:mongoose.Schema.Types.ObjectId,

            ref:"User",

            required:true

        }

    },

    {

        timestamps:true

    }

);


const Report = mongoose.model(

    "Report",

    reportSchema

);


module.exports = Report;