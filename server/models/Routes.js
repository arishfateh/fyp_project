const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scheme
const RouteScheme = new Schema({
    id: {
        type: Number,

    },


    StartPoint: {
        type: String,
        required: true
    },
    EndPoint: {
        type: String,
        required: true
    },

    roadConditon: {
        type: String,
    },

    Distance: {
        type: Number,
    },
    Priority: {
        type: Number,
    },

    Time: {
        type: Number,
    },
    isAvailable: {
        type: Boolean,

    },

})

module.exports = Route = mongoose.model('route', RouteScheme);