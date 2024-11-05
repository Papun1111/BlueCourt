import { Router } from "express";
const postrouter=Router();
import activeCheck from "../controllers/post.controller.js";
postrouter.route("/api").get(activeCheck);
export default postrouter;