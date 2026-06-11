const express = require("express");
const router = express.Router();
const db = require("../db");


// ==========================
// GET ALL USERS
// ==========================
router.get("/users", async (req, res) => {
    try {
        const [users] = await db.promise().query(
            "SELECT * FROM users ORDER BY id DESC"
        );

        res.json(users);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error fetching users"
        });
    }
});


// ==========================
// GET SINGLE USER
// ==========================
router.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [user] = await db.promise().query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );

        res.json(user[0]);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error fetching user"
        });
    }
});


// ==========================
// TOGGLE BLOCK / UNBLOCK USER
// ==========================
router.put("/users/toggle/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Get current status
        const [user] = await db.promise().query(
            "SELECT status FROM users WHERE id = ?",
            [id]
        );

        if (!user.length) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentStatus = user[0].status;

        const newStatus =
            currentStatus === "Active" ? "Blocked" : "Active";

        await db.promise().query(
            "UPDATE users SET status = ? WHERE id = ?",
            [newStatus, id]
        );

        res.json({
            message: "User status updated",
            status: newStatus
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error updating user status"
        });
    }
});


// ==========================
// DELETE USER
// ==========================
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await db.promise().query(
            "DELETE FROM users WHERE id = ?",
            [id]
        );

        res.json({
            message: "User deleted successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error deleting user"
        });
    }
});

// ==========================
// USER LOGIN
// ==========================
router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const [user] = await db.promise().query(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            [email, password]
        );

        if (user.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (user[0].status === "Blocked") {
            return res.status(403).json({
                success: false,
                message: "Your account is blocked"
            });
        }

        res.json({
            success: true,
            message: "Login successful",
            user: user[0]
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

// ==========================
// REGISTER USER
// ==========================
router.post("/register", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const [existing] = await db.promise().query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        await db.promise().query(
            `INSERT INTO users
            (name, email, password, joined_date, status)
            VALUES (?, ?, ?, CURDATE(), 'Active')`,
            [name, email, password]
        );

        res.json({
            success: true,
            message: "Registration Successful"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});
module.exports = router;