const mongoose = require('mongoose');

const foodsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a food name"]
        },
        calories: {
            type: Number,
            required: [true, "Please enter a number for calorie"]
        }
    },
    {
        timestamps: true
    }
);

const Foods = mongoose.model('Foods', foodsSchema);
module.exports = Foods; 