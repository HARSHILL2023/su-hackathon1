const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require('dotenv').config();

// Professional Email Transporter (Configured for Gmail SMTP)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const lowerEmail = email.toLowerCase();
    const existing = await User.findOne({ email: lowerEmail });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: lowerEmail, password: hashed, role });
    res.json({ msg: "User registered successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase();
    const user = await User.findOne({ email: lowerEmail });
    if (!user) return res.status(401).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    // Step 1: Generate OTP (2-Step Auth)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save();

    // STEP 2: Send REAL Email (2-Step Auth)
    try {
        await transporter.sendMail({
            from: '"SmartFactory Security" <security@smartfactory.ai>',
            to: user.email,
            subject: "🔐 Your Secure Access Token",
            text: `Your SmartFactory verification code is: ${otp}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: white; border-radius: 12px; max-width: 400px; margin: auto;">
                    <h2 style="color: #6366f1;">SmartFactory AI</h2>
                    <p style="opacity: 0.7;">Your secure authentication token is below. It expires in 10 minutes.</p>
                    <div style="background: rgba(99, 102, 241, 0.1); border: 2px solid #6366f1; padding: 20px; font-size: 2rem; font-weight: 900; letter-spacing: 5px; text-align: center; border-radius: 12px; color: #6366f1;">
                        ${otp}
                    </div>
                    <p style="font-size: 0.8rem; margin-top: 20px; opacity: 0.5;">If you didn't request this, please secure your account immediately.</p>
                </div>
            `
        });
        console.log(`📧 SUCCESS: Email token dispatched to ${user.email}`);
    } catch (emailErr) {
        console.log(`⚠️ EMAIL ERROR: Failed to send to ${user.email}. Using console backup.`);
    }

    // SECURE LOGGING: Backup for development
    console.log("\n" + "=".repeat(30));
    console.log(`🔐 BACKUP TOKEN for ${user.email}`);
    console.log(`👉 CODE: ${otp}`);
    console.log("=".repeat(30) + "\n");

    res.json({ 
        msg: "OTP sent to your email", 
        twoStepRequired: true, 
        email: user.email,
        hackathonToken: otp // FOR HACKATHON DEMO ONLY: So you can see it instantly if email is delayed
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const lowerEmail = email.toLowerCase();
    const cleanOtp = otp.toString().trim();
    
    console.log(`🔍 [VERIFY] Attempt for ${lowerEmail} with code: ${cleanOtp}`);

    // MASTER BYPASS FOR HACKATHON: "888888" always works
    if (cleanOtp === "888888") {
       const user = await User.findOne({ email: lowerEmail });
       if (user) {
           console.log("✅ [MASTER] Bypass activated");
           const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, "SECRET", { expiresIn: '24h' });
           return res.json({ token, role: user.role, name: user.name });
       }
    }

    const user = await User.findOne({ email: lowerEmail, otp: cleanOtp, otpExpires: { $gt: Date.now() } });
    
    if (!user) {
        console.log("❌ [VERIFY] Failed: OTP mismatch or expired");
        return res.status(401).json({ msg: "Invalid or expired OTP" });
    }
    
    console.log("✅ [VERIFY] OTP successfully matched");

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