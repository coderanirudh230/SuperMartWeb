<<<<<<< HEAD
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
=======
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
>>>>>>> 3618986810fe4c6213b3baec93f19b89173bca25
