const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scheme
const ItineraryScheme = new Schema({




    id: {
        type: Number,
    },
    NoOfDays: {
        type: Number,
        required: true
    },
    Destination: {
        type: String,
        required: true
    },
    PriceBracket: {
        type: String,
    },
    GroupType: {
        type: String,
    },
    NoOfPeople: {
        type: Number,
    },
    TotalCost: {
        type: Number,
    },

    todo: [{
        type: Schema.Types.Mixed,
    }],
    scores: [{
        type: Schema.Types.Mixed,
    }],



})

module.exports = Itinerary = mongoose.model('itinerary', ItineraryScheme);