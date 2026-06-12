<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */

// AUTH ROUTES
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// CART ROUTES
const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

/* ================= PRODUCTS API ================= */

// GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
    db.query(
        "SELECT * FROM products ORDER BY id DESC",
        (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }
            res.json(result);
        }
    );
});

// ADD PRODUCT
app.post("/api/products", (req, res) => {
    const { name, price, category, image } = req.body;

    db.query(
        "INSERT INTO products (name, price, category, image) VALUES (?, ?, ?, ?)",
        [name, price, category, image],
        (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }
            res.json({ success: true, message: "Product added" });
        }
    );
});

// UPDATE PRODUCT
app.put("/api/products/:id", (req, res) => {
    const { name, price, category, image } = req.body;

    db.query(
        "UPDATE products SET name=?, price=?, category=?, image=? WHERE id=?",
        [name, price, category, image, req.params.id],
        (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }
            res.json({ success: true, message: "Product updated" });
        }
    );
});

// DELETE PRODUCT
app.delete("/api/products/:id", (req, res) => {
    db.query(
        "DELETE FROM products WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }
            res.json({ success: true, message: "Product deleted" });
        }
    );
});

/* ================= CATEGORY FILTERS ================= */

// MOBILE
app.get("/api/products/mobile", (req, res) => {
    db.query(
        "SELECT * FROM products WHERE category='mobile'",
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

// BOOKS
app.get("/api/books", (req, res) => {
    db.query(
        "SELECT * FROM products WHERE category='Books'",
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

/* ================= WISHLIST ================= */

app.get("/api/wishlist", (req, res) => {
    db.query("SELECT * FROM wishlist ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

/* ================= SERVER START ================= */

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/test", (req, res) => {
    res.json({ message: "Server working" });
});
=======
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */

// AUTH ROUTES
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// CART ROUTES
const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

/* ================= PRODUCTS API ================= */

// GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
    db.query(
        "SELECT * FROM products ORDER BY id DESC",
        (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }
            res.json(result);
        }
    );
});

// ADD PRODUCT
app.post("/api/products", (req, res) => {
    const { name, price, category, image } = req.body;

    db.query(
        "INSERT INTO products (name, price, category, image) VALUES (?, ?, ?, ?)",
        [name, price, category, image],
        (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }
            res.json({ success: true, message: "Product added" });
        }
    );
});

// UPDATE PRODUCT
app.put("/api/products/:id", (req, res) => {
    const { name, price, category, image } = req.body;

    db.query(
        "UPDATE products SET name=?, price=?, category=?, image=? WHERE id=?",
        [name, price, category, image, req.params.id],
        (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }
            res.json({ success: true, message: "Product updated" });
        }
    );
});

// DELETE PRODUCT
app.delete("/api/products/:id", (req, res) => {
    db.query(
        "DELETE FROM products WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }
            res.json({ success: true, message: "Product deleted" });
        }
    );
});

/* ================= CATEGORY FILTERS ================= */

// MOBILE
app.get("/api/products/mobile", (req, res) => {
    db.query(
        "SELECT * FROM products WHERE category='mobile'",
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

// BOOKS
app.get("/api/books", (req, res) => {
    db.query(
        "SELECT * FROM products WHERE category='Books'",
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

/* ================= WISHLIST ================= */

app.get("/api/wishlist", (req, res) => {
    db.query("SELECT * FROM wishlist ORDER BY id DESC", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

/* ================= SERVER START ================= */

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/test", (req, res) => {
    res.json({ message: "Server working" });
});
>>>>>>> 3618986810fe4c6213b3baec93f19b89173bca25
