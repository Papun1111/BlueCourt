import mongoose from "mongoose";
const PostSchema=mongoose.Schema({
    userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"user"
    },
    body:{
type:String,
required:true
    },
    likes:{
type:Number,
default:0
    },
    createdAt:{
type:Date,
default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    media:{
type:String,
default:""
    },
    active:{
type:Boolean,
default:""
    },
    fileType:{
type:String,
default:""
    },
});

const post=mongoose.model("Post",PostSchema);
export post;