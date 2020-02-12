const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scheme
const StayPointsScheme = new Schema({
    id: {
        type: Number,

    },

    DepartureCity: {
        type: String,
        required: true
    },
    DestinationCity: {
        type: String,
        required: true
    },
    StopOverCity: {
        type: String,
    },
    Priority: {
        type: Number,
    },


})

module.exports = StayPoint = mongoose.model('staypoint', StayPointsScheme);