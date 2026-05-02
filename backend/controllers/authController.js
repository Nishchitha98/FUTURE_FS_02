const jwt = require("jsonwebtoken");
const User = require("../models/User");

const ADMIN = {
    email: "admin@gmail.com",
    password: "123456",
};

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Create new user
        const user = new User({ email, password });
        await user.save();

        // Generate token
        const token = jwt.sign({ email: user.email, id: user._id }, "secretkey", { expiresIn: "1d" });
        
        res.status(201).json({ token, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error during registration", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fallback for hardcoded admin
        if (email === ADMIN.email && password === ADMIN.password) {
            const token = jwt.sign({ email, id: "000000000000000000000000" }, "secretkey", { expiresIn: "1d" });
            return res.json({ token });
        }

        // Check database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ email: user.email, id: user._id }, "secretkey", { expiresIn: "1d" });
        
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error during login", error: err.message });
    }
};