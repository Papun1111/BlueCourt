import mongoose from "mongoose";
import { Schema } from "mongoose";
const connectionSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    connectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status_accepted:{
        type:Boolean,
        default:null,
    }
})

const connectionModel=mongoose.model("Connection",connectionSchema);