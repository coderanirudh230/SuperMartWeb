const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all orders
router.get("/orders", (req, res) => {
    const sql = "SELECT * FROM orders";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// Update order status
router.put("/orders/:id", (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    const sql = "UPDATE orders SET status=? WHERE id=?";

    db.query(sql, [status, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Order updated" });
    });
});

module.exports = router;