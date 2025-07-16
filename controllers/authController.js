import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if(existing) return res.status(400).json({ message: "User already exists"})
        
        const user = await User.create({ username, email, password })
        const token = generateToken(user._id)

        res.status(201).json({ user: { username, email }, message: "User created successfully", token})
    } catch (error) {
        res.status(500).json({ message: 'Signup failed...', error: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if(!user || !await user.matchPassword(password)) 
            return res.status(400).json({ message: "Invalid Credentials"})

        const token = generateToken(user._id)
        res.status(200).json({ user: { id: user._id, username: user.username }, message: "Login successful", token})
    } catch (error) {
        res.status(500).json({ message: 'Login failed...', error: error.message })
    }
}

