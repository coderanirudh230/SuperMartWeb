const express = require("express");
const router = express.Router();
const db = require("../db");

/* ADD TO WISHLIST */
router.post("/add", (req, res) => {
    const { product_id, product_name, price, image } = req.body;

    const sql = `
        INSERT INTO wishlist (product_id, product_name, price, image)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [product_id, product_name, price, image], (err) => {
        if (err) return res.json({ success: false, error: err });

        res.json({ success: true, message: "Added to wishlist" });
    });
});

/* GET WISHLIST */
router.get("/", (req, res) => {
    db.query("SELECT * FROM wishlist ORDER BY id DESC", (err, result) => {
        if (err) return res.json({ success: false, error: err });

        res.json({ success: true, data: result });
    });
});

/* DELETE */
router.delete("/delete/:id", (req, res) => {
    db.query("DELETE FROM wishlist WHERE id=?", [req.params.id], (err) => {
        if (err) return res.json({ success: false, error: err });

        res.json({ success: true, message: "Deleted" });
    });
});

module.exports = router;