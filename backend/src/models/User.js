const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(

    {

        fullName: {

            type: String,
            required: true,
            trim: true

        },


        email: {

            type: String,
            required: true,
            unique: true,
            lowercase: true

        },


        password: {

            type: String,
            required: true

        },


        department: {

            type: String,
            required: true

        },


        year: {

            type: Number,
            required: true

        },


        role: {

            type: String,
            default: "Student"

        },


        profilePicture: {

            type: String,
            default: ""

        }


    },

    {
        timestamps: true
    }

);


module.exports = mongoose.model(
    "User",
    userSchema
);