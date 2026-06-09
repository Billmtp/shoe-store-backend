require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {

    if (err) {
        console.log("Lỗi kết nối:", err);
        return;
    }

    console.log("Đã kết nối MySQL");
});

module.exports = db;