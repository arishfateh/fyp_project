const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scheme
const CitySchema = new Schema({
    id: {
        type: Number,

    },

    CityName: {
        type: String,
        required: true
    },
    StayPriority: {
        type: Number,
    },

    Latitude: {
        type: String,

    },
    Longitude: {
        type: String,
    },
    MaximumStop: {
        type: Number
    },
})

module.exports = City = mongoose.model('city', CitySchema);