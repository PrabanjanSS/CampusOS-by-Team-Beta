const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        venue: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        registrationLink: {
            type: String
        },
        image: {
            type: String,
            default: ""
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        participants: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                mode: {
                    type: String,
                    enum: ["Online", "In Person"],
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;