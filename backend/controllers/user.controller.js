import { Profile } from "../models/profile.model.js";
import user from "../models/user.model.js";
import bcrypt from "bcrypt"

const register=async (req,res) => {
    try {
        const{name,email,password,username}=req.body;
        if(!name||!email||!password||!username){
            return res.status(400).json({message:"All fields are required"});
        }
        const users=await user.findOne({
            email
        });
        if(users)return res.status(400).json({message:"user already exists"});
        const salt=await bcrypt.genSalt(password,10);
        const hashedPassword=await hash(password,salt);
        const newUser=new user({
name,
email,
password:hashedPassword,
username
        })
        await newUser.save();
        const profile=new Profile({userId:newUser._id});
        return res.json({message:"User registered successfully"});
    } catch (error) {
        return res.json({
            message:error.message
        })
    }
}

export {register};