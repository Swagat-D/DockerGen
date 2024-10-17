import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true,unique:true},
img:{type:String,required:false},
githubid:{type:String,required:false},
githubtoken:{type:String,required:false},
},{timestamps:true})
mongoose.models = {}
export default mongoose.model.User||mongoose.model('User',UserSchema);