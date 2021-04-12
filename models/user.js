const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    password:String,
    email:{type:String,required:true,unique:true}
});

const user=new mongoose.model('UserSchema',UserSchema);
module.exports=user;