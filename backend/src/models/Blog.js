const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        content: {
            type: String,
            required: true
        },

        tags: [
            {
                type: String
            }
        ],

        image: {
            type: String,
            default: ""
        },

        clubName: {
            type: String,
            required: true
        },

        likes: {
            type: Number,
            default: 0
        },

        views: {
            type: Number,
            default: 0
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        },

        facultyRemarks: {
            type: String,
            default: ""
        }

    },

    {
        timestamps: true
    }
);



const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;