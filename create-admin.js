const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/Users.js");

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const existing = await User.findOne({ username: "admin" });
        if (existing) {
            console.log("Admin user already exists.");
            process.exit(0);
        }
        const hashedPassword = await bcrypt.hash("Admin123", 10);
        const admin = new User({ username: "admin", password: hashedPassword, role: "admin" });
        await admin.save();
        console.log("Admin user created. Username: admin  Password: Admin123");
        process.exit(0);
    })
    .catch(err => {
        console.error("Error:", err);
        process.exit(1);
    });