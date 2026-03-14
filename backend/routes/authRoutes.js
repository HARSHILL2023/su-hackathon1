const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, securityQuestion, securityAnswer } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role, securityQuestion, securityAnswer });
    res.json({ msg: "User registered successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    // Step 1: Generate OTP (2-Step Auth)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    // SECURE LOGGING: For development/hackathon, we log the OTP to the SERVER TERMINAL.
    // This keeps it off the web browser screen for safety.
    console.log("\n" + "=".repeat(30));
    console.log(`🔐 SECURE AUTH TOKEN for ${user.email}`);
    console.log(`👉 CODE: ${otp}`);
    console.log("=".repeat(30) + "\n");

    res.json({ msg: "OTP sent", twoStepRequired: true, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    
    if (!user) return res.status(401).json({ msg: "Invalid or expired OTP" });

    // Step 3: Return security question for final check
    res.json({ 
      step: 3, 
      msg: "OTP Verified", 
      securityQuestion: user.securityQuestion || "What is your secret key?" 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/verify-security", async (req, res) => {
  try {
    const { email, securityAnswer } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || user.securityAnswer !== securityAnswer) {
      return res.status(401).json({ msg: "Incorrect security answer" });
    }

    // Clear OTP
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, "SECRET", { expiresIn: '24h' });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;