const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config();

const tankonyvekRoutes = require('./routes/tankonyvekRoutes');
const feladatokRoutes = require('./routes/feladatokRoutes');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static('views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'oraterv.html'));
});

// Routes
app.use('/tankonyvek', tankonyvekRoutes);
app.use('/feladatok', feladatokRoutes);

app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton`);
});


/*const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require("body-parser");
const path = require('path');
const env = require('dotenv').config();

const app = express();
const port =  3002;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "lali_user",
  password: "CvLEP4O2tn0z3Dub5pzygM5q9p2O5TX0",
  database: "lali",
  port: 3306 
});

db.connect((err) => {
  if (err) {
      console.error('Hiba az adatbázishoz történő kapcsolódás során: ', err);
      return;
  }
  console.log('Sikeres kapcsolódás az adatbázishoz!');
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'oraterv.html'));
});

app.get('/tankonyvek', (req, res) => {
  const sql = 'SELECT * FROM lali.tankonyvek';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Hiba történt a lekérdezés során: ', err);
      res.status(500).send('Hiba történt az adatbázis lekérdezése közben');
      return;
    }
    res.json(results);
  });
});

app.get('/temak/:tk_nev', (req, res) => {
    const tankonyvNev = req.params.tk_nev; 
    const sql = 'SELECT DISTINCT lali.feladatok.f_tema FROM lali.feladatok INNER JOIN lali.tankonyvek ON lali.feladatok.f_tankonyv_id=lali.tankonyvek.tk_id WHERE lali.tankonyvek.tk_nev = ?';
    
    db.query(sql, [tankonyvNev], (err, results) => {
      if (err) {
        console.error('Hiba történt a témák lekérdezése során: ', err);
        res.status(500).send('Hiba történt a témák lekérdezése közben');
        return;
      }
      res.json(results);
    });
  });

app.get('/feladatok/:f_tema', (req, res) => {
    const temaNev = req.params.f_tema; 
    const sql = 'SELECT * FROM feladatok WHERE f_tema = ?';
    
    db.query(sql, [temaNev], (err, results) => {
      if (err) {
        console.error('Hiba történt a témák lekérdezése során: ', err);
        res.status(500).send('Hiba történt a témák lekérdezése közben');
        return;
      }
      res.json(results);
    });
  });


app.listen(port, () => {
  console.log(`Szerver fut a ${port} porton`);
});
*/