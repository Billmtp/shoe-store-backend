const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());

app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        res.json(result);
    });
});

app.get("/api/products/:id", (req, res) => {
    db.query(
        "SELECT * FROM products WHERE id = ?",
        [req.params.id],
        (err, result) => {
            res.json(result[0]);
        }
    );
});

app.listen(3000);