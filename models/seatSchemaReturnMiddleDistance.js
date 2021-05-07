let mongoose = require("mongoose");

// flight return schema short distance

const seatSchemaReturnMiddleDistance = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    available: {
        type: Boolean
    }
});

const seatReturnMiddleDistance = new mongoose.model('SeatSchemaReturnMiddleDistance', seatSchemaReturnMiddleDistance);

module.exports = seatReturnMiddleDistance;