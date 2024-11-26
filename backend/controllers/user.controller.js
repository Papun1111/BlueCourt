import { Profile } from "../models/profile.model.js";
import  user  from "../models/user.model.js"; // Adjusted import
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Using JWT for token generation

const register = async (req, res) => {
    try {
        const { name, email, password, username } = req.body;
        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const existingUser = await user.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "User already exists." });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            username
        });
        await newUser.save();
        const profile = new Profile({ userId: newUser._id });
        await profile.save();
        return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const foundUser = await user.findOne({ email });
        if (!foundUser) return res.status(404).json({ message: "User does not exist." });

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign({ id: foundUser._id }, "your_jwt_secret", { expiresIn: '1h' });
        await user.updateOne({ _id: foundUser._id }, { $set: { token } });
        return res.json({ message: "Logged in successfully", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

export { register, login };
