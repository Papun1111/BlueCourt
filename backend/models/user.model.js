import mongoose, { Schema } from "mongoose";
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },email:{
        type:String,
        required:true,
        unique:true
    },
    active:{
        type:Boolean,
        default:true,      
    },
    password:{
        type:String,
        required:true
    },profile:{
        type:String,
        default:"default.png"
    },createdAt:{
        type:Date,
        default:Date.now
    },
    token:{
        type:String,
        default:""
    }
});

const user=mongoose.model("user",userSchema);
export default user;