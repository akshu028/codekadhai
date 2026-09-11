const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("🔥 CodeKadhai backend is cooking!");
});

// Bring the Idea form
app.post("/api/ideas", async (req, res) => {
  try {
    const { name, email, idea, contact } = req.body;

    // Basic validation
    if (!name || !email || !idea) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields."
      });
    }

    // Email sent to your Gmail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `🔥 New CodeKadhai Idea from ${name}`,
      text: `
Someone wants to cook something with CodeKadhai!

Name: ${name}
Email: ${email}
Contact: ${contact || "Not provided"}

Their idea:
${idea}
      `
    });

    res.status(200).json({
      success: true,
      message: "Your idea has been sent to the Kadhai! 🔥"
    });

  } catch (error) {
    console.error("Email error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while sending your idea."
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 CodeKadhai backend running on http://localhost:${PORT}`);
});