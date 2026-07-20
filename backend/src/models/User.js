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
        club: {
            type: String,
            required: false
        },
        department: {
            type: String,
            required: false
        },
        year: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            enum: ["member", "lead", "faculty", "Student", "Club Lead", "Faculty Coordinator"],
            default: "member"
        },
        profilePicture: {
            type: String,
            default: ""
        },
        points: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);