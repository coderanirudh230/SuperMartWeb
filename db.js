const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12830175",
    password: "yamFEGcVeU",
    database: "sql12830175"
});

db.connect(err => {
    if (err) {
        console.log("MySQL connection error:", err);
    } else {
        console.log("MySQL Connected");
    }
});

module.exports = db;
