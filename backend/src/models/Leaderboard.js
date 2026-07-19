const mongoose = require("mongoose");


const leaderboardSchema = new mongoose.Schema(

    {

        name:{
            type:String,
            required:true
        },

        clubName:{
            type:String,
            required:true
        },

        points:{
            type:Number,
            default:0
        },

        rank:{
            type:Number,
            required:true
        },

        category:{
            type:String,
            required:true
        }

    },

    {
        timestamps:true
    }

);


const Leaderboard = mongoose.model(

    "Leaderboard",

    leaderboardSchema

);


module.exports = Leaderboard;