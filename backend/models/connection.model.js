import mongoose from "mongoose";
import { Schema } from "mongoose";
const connectionSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    connectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status_accepted:{
        type:Boolean,
        default:null,
    }
})

const connectionModel=mongoose.model("Connection",connectionSchema);
export default connectionModel;