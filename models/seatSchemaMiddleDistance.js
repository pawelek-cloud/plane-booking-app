let mongoose = require("mongoose");

// flight schema short distance

  const seatSchemaMiddleDistance=new mongoose.Schema({
    _id:{
      type:String,
      required:true
    },
    available:{
      type:Boolean
    }
  });

const seatMiddleDistance=new mongoose.model('SeatSchemaMiddleDistance',seatSchemaMiddleDistance);

module.exports=seatMiddleDistance;



