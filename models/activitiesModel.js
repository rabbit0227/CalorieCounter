const mongoose = require('mongoose');

const activitiesSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter an activity name"]
        },
        calories_bpm: {
            type: Number,
            required: [true, "Please enter a number for calories burned per minute"]
        }
    },
    {
        timestamps: true
    }
);

const Activities = mongoose.model('Activities', activitiesSchema);
module.exports = Activities; 