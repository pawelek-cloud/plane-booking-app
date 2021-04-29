let mongoose = require("mongoose");

// flight schema short distance

  const seatSchemaShortDistance=new mongoose.Schema({
    _id:{
      type:String,
      required:true
    },
    available:{
      type:Boolean
    }
  });

const seatShortDistance=new mongoose.model('SeatSchemaShortDistance',seatSchemaShortDistance);

module.exports=seatShortDistance;



