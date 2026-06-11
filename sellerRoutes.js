const express = require("express");
const router = express.Router();
const db = require("../db");

// Get All Sellers
router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM sellers",
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );

});

// Approve Seller
router.put("/approve/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "UPDATE sellers SET status='Approved' WHERE id=?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Seller Approved Successfully"
            });
        }
    );

});

// Reject Seller
router.put("/reject/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "UPDATE sellers SET status='Rejected' WHERE id=?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Seller Rejected Successfully"
            });
        }
    );

});

module.exports = router;