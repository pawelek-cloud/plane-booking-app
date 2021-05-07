let mongoose = require("mongoose");

// flight schema short distance

  const seatSchemaLongDistance=new mongoose.Schema({
    _id:{
      type:String,
      required:true
    },
    available:{
      type:Boolean
    }
  });

const seatLongDistance=new mongoose.model('SeatSchemaLongDistance',seatSchemaLongDistance);

module.exports=seatLongDistance;



