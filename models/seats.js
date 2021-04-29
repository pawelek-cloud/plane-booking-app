let mongoose = require("mongoose");

  const seatSchema=new mongoose.Schema({
    _id:{
      type:String,
      required:true
    },
    available:{
      type:Boolean
    }
  });

const seat=new mongoose.model('SeatSchema',seatSchema);
module.exports=seat;



