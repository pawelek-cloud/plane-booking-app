let mongoose = require("mongoose");

// flight return schema short distance

const seatSchemaReturnShortDistance = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    available: {
        type: Boolean
    }
});

const seatReturnShortDistance = new mongoose.model('SeatSchemaReturnShortDistance', seatSchemaReturnShortDistance);

module.exports = seatReturnShortDistance;