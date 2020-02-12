const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scheme
const TransportScheme = new Schema({




    id: {
        type: Number,

    },

    City: {
        type: String,
        required: true
    },
    NoOfVehicles: {
        type: String,
        required: true
    },
    VendorName: {
        type: String,
    },

    VendorPhoneNo: {
        type: String,
    },

    TransportType: {
        type: Schema.Types.Mixed
        //ref:"PropertyTypes"
    },
})

module.exports = Transport = mongoose.model('transport', TransportScheme);