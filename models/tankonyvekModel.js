const db = require('../config/database');

const TankonyvekModel = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM lali.tankonyvek';
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  
  getTemakByTankonyvNev: (tankonyvNev, callback) => {
    const sql = 'SELECT DISTINCT f_tema FROM lali.feladatok INNER JOIN lali.tankonyvek ON lali.feladatok.f_tankonyv_id=lali.tankonyvek.tk_id WHERE lali.tankonyvek.tk_nev = ?';
    db.query(sql, [tankonyvNev], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  }
};

module.exports = TankonyvekModel;
