const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Instant Login (No OTP) for Hackathon Demo
 */
router.post("/login", async (req, res) => {
    try {
        const { email, role } = req.body;
        if (!email) return res.status(400).json({ msg: "Email is required" });

        const lowerEmail = email.toLowerCase();
        
        // Find or create user
        let user = await User.findOne({ email: lowerEmail });
        if (!user) {
            user = new User({
                email: lowerEmail,
                name: lowerEmail.split('@')[0],
                role: role || "Strategic Owner"
            });
        }
        
        if (role) {
            user.role = role; // Update to selected role
        }
        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            "SECRET", // User's manual edit changed secret to "SECRET" in middleware
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            role: user.role,
            name: user.name,
            msg: "Nirvana Link Established"
        });

    } catch (err) {
        console.error("Auth Error:", err);
        res.status(500).json({ msg: "Neural Bridge Failure" });
    }
});

// Registration route for completeness (also instant)
router.post("/register", async (req, res) => {
    try {
        const { email, name, role } = req.body;
        if (!email) return res.status(400).json({ msg: "Email required" });

        let user = await User.findOne({ email: email.toLowerCase() });
        if (user) return res.status(400).json({ msg: "Identity already exists" });

        user = new User({
            email: email.toLowerCase(),
            name: name || email.split('@')[0],
            role: role || "Strategic Owner"
        });
        await user.save();

        res.json({ success: true, msg: "Registration complete" });
    } catch (err) {
        res.status(500).json({ msg: "Registration failed" });
    }
});

module.exports = router;