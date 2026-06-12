const express = require("express");
const router = express.Router();
const db = require("./db");

// ADD TO CART
router.post("/add", (req, res) => {
    const { product_id, product_name, price, image, quantity } = req.body;

    const sql = `
        INSERT INTO cart (product_id, product_name, price, image, quantity)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [product_id, product_name, price, image, quantity || 1], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Added to cart" });
    });
});

// GET CART ITEMS
router.get("/", (req, res) => {
    db.query("SELECT * FROM cart", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// DELETE ITEM
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM cart WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Deleted" });
    });
});

module.exports = router;
