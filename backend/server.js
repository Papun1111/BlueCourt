import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import postrouter from "./routes/post.routes.js"
dotenv.config();

const app=express();
const port=process.env.PORT||1111
app.use(cors())
app.use(express.json());
app.use("/",postrouter);
const start=async () => {
    const connectDb=await mongoose.connect(process.env.MONGO_URL);

    app.listen(port,()=>{
console.log(`listening on port ${port}`)
console.log("db connected");
    });
}

start();