const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/stats", (req, res) => {

    db.query(
        "SELECT COUNT(*) AS totalProducts FROM products",
        (err, productResult) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch dashboard statistics",
                    error: err.message
                });
            }

            db.query(
                "SELECT COUNT(*) AS totalUsers FROM users",
                (err, userResult) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Failed to fetch dashboard statistics",
                            error: err.message
                        });
                    }

                    db.query(
                        "SELECT IFNULL(SUM(amount), 0) AS totalSales FROM orders",
                        (err, salesResult) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: "Failed to fetch dashboard statistics",
                                    error: err.message
                                });
                            }

                            res.json({
                                totalSales: salesResult[0].totalSales,
                                totalProducts: productResult[0].totalProducts,
                                totalUsers: userResult[0].totalUsers
                            });
                        }
                    );

                }
            );

        }
    );

});

module.exports = router;