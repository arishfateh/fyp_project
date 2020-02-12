const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scheme
const HotelScheme = new Schema({

    id: {
        type: Number,
    },
    City: {
        type: String,
        required: true
    },
    HotelName: {
        type: String,
        required: true
    },
    NoOfRooms: {
        type: String,
    },
    VendorName: {
        type: String,
    },
    VendorPhoneNo: {
        type: String,
    },
    roomTypes: {
        type: Schema.Types.Mixed,
    },

    HotelServices: [{
        type: String
    }]


})

module.exports = Hotel = mongoose.model('hotel', HotelScheme);