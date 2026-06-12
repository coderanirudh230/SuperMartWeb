const express = require("express");
const router = express.Router();
const db = require("./db");

/* ================= REGISTER ================= */
router.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // Check if customer already exists
    const checkSql = "SELECT * FROM customers WHERE email = ?";

    db.query(checkSql, [email], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err
            });
        }

        if (result.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Insert new customer
        const insertSql = `
            INSERT INTO customers (name, email, password, status, joined_date)
            VALUES (?, ?, ?, 'Active', CURDATE())
        `;

        db.query(insertSql, [name, email, password], (err2) => {

            if (err2) {
                return res.status(500).json({
                    success: false,
                    message: "Error inserting customer",
                    error: err2
                });
            }

            res.json({
                success: true,
                message: "Customer registered successfully"
            });
        });
    });
});


/* ================= LOGIN ================= */
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password required"
        });
    }

    const sql = "SELECT * FROM customers WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const customer = result[0];

        if (customer.status === "Blocked") {
            return res.status(403).json({
                success: false,
                message: "Account is blocked"
            });
        }

        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: customer.id,
                name: customer.name,
                email: customer.email
            }
        });
    });
});


module.exports = router;
