const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// GET tất cả sản phẩm
app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// GET 1 sản phẩm
app.get("/api/products/:id", (req, res) => {
    db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: "Không tìm thấy" });
        res.json(result[0]);
    });
});

// POST thêm sản phẩm
app.post("/api/products", (req, res) => {
    const { name, price, image, description } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Thiếu name hoặc price" });
    db.query(
        "INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)",
        [name, price, image, description],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, name, price, image, description });
        }
    );
});

// PUT sửa sản phẩm
app.put("/api/products/:id", (req, res) => {
    const { name, price, image, description } = req.body;
    db.query(
        "UPDATE products SET name=?, price=?, image=?, description=? WHERE id=?",
        [name, price, image, description, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ error: "Không tìm thấy" });
            res.json({ id: req.params.id, name, price, image, description });
        }
    );
});

// DELETE xóa sản phẩm
app.delete("/api/products/:id", (req, res) => {
    db.query("DELETE FROM products WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Không tìm thấy" });
        res.json({ message: "Đã xóa" });
    });
});

app.listen(3000, () => console.log("Server chạy tại port 3000"));