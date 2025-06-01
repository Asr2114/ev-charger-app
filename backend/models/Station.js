const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: String,
    location: {
        lat:  Number,
        lng: Number
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"]
    },

    power: Number,
    connectorType: String
});

module.exports = mongoose.model("Station", stationSchema);