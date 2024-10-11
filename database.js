/*const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    
});
  
db.connect((err) => {
    if (err) {
        console.error('Hiba az adatbázishoz történő kapcsolódás során: ', err);
        return;
    }
    console.log('Sikeres kapcsolódás az adatbázishoz!');
});

module.exports = db;*/

/*
const db = mysql.createConnection({
    host: 'localhost',     
    user: 'root',        
    password: '',
    database: 'oraterv_adatb'
});
*/