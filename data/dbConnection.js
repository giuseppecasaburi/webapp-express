// CONFIGUARAZIONE MYSQL
const mysql = require("mysql2");
const connection = mysql.createConnection({
    // DATI UTILI PER IL COLLEGAMENTO CHE SONO INSERITI NEL FILE .ENV
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// FUNZIONE CHE COLLEGA IL DATABASE IN ASSENZA DI ERRORI
connection.connect((err) => {
    if (err) throw err;
    console.log("Server collegato al database")
})

module.exports = connection;