const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Anirudh1@",
    database: "supermart_db"
});

db.connect(err => {
    if (err) {
        console.log("MySQL connection error:", err);
    } else {
        console.log("MySQL Connected");
    }
});

module.exports = db;