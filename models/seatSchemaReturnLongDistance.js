let mongoose = require("mongoose");

// flight return schema short distance

const seatSchemaReturnLongDistance = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    available: {
        type: Boolean
    }
});

const seatReturnLongDistance = new mongoose.model('SeatSchemaReturnLongDistance', seatSchemaReturnLongDistance);

module.exports = seatReturnLongDistance;