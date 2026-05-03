const jwt = require("jsonwebtoken");
const User = require("../models/User");

const ADMIN = {
    email: "admin@gmail.com",
    password: "123456",
};

exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Create new user
        const user = new User({ email, password, firstName, lastName, phone });
        await user.save();

        // Generate token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET || "crm_secret_123", { expiresIn: "1d" });
        
        res.status(201).json({ token, message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error during registration", error: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        // Fallback for hardcoded admin
        if (req.user.id === "000000000000000000000000") {
            return res.json({
                email: ADMIN.email,
                firstName: "Admin",
                lastName: "User",
                phone: "+91 9999999999"
            });
        }

        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error fetching profile", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fallback for hardcoded admin
        if (email === ADMIN.email && password === ADMIN.password) {
            const token = jwt.sign({ email, id: "000000000000000000000000" }, process.env.JWT_SECRET || "crm_secret_123", { expiresIn: "1d" });
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
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET || "crm_secret_123", { expiresIn: "1d" });
        
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error during login", error: err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Admin fallback check (not allowing password change for hardcoded admin for safety)
        if (req.user.id === "000000000000000000000000") {
            return res.status(403).json({ message: "Cannot change password for demo admin account" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect current password" });
        }

        // Update password
        user.password = newPassword;
        await user.save(); // pre-save hook will hash it

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error updating password", error: err.message });
    }
};