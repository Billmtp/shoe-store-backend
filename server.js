const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.get("/api/products/:id", (req, res) => {
    db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result[0]);
    });
});

app.post("/api/products", (req, res) => {
    const { name, price, image, description } = req.body;
    db.query(
        "INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)",
        [name, price, image, description],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, name, price, image, description });
        }
    );
});

app.put("/api/products/:id", (req, res) => {
    const { name, price, image, description } = req.body;
    db.query(
        "UPDATE products SET name=?, price=?, image=?, description=? WHERE id=?",
        [name, price, image, description, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Đã cập nhật" });
        }
    );
});

app.delete("/api/products/:id", (req, res) => {
    db.query("DELETE FROM products WHERE id=?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Đã xóa" });
    });
});

app.listen(3000, () => console.log("Server chạy tại port 3000"));