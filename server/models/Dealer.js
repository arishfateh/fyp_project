const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Scheme
const DealerScheme = new Schema({
    id: {
        type: Number,

    },
    name: {
        type: String,
        required: true
    },
    contact_no: {
        type: String,
        required: true
    },
    contact_no2: {
        type: String,
    },
    contact_no3: {
        type: String,
    }
    ,
    contact_no4: {
        type: String,

    },
    contact_no5: {
        type: String,

    }
})

module.exports = Dealer = mongoose.model('dealers', DealerScheme);