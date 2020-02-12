const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scheme
const AttractionPointScheme = new Schema({
    id: {
        type: Number,

    },

    AttractionName: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Type: {
        type: String,
    },
    Description: {
        type: String,
    },

    Price: {
        type: Number,
    },
    Priority: {
        type: Number,
    },
    Time: {
        type: Number,
    },
    travelDistance: {
        type: Number,
    },
    travelTime: {
        type: Number,
    },
    timeSlots: {
        type: Number,
    },


})

module.exports = AttractionPoint = mongoose.model('attractionpoint', AttractionPointScheme);