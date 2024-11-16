const db = require('../config/database');

const FeladatokModel = {
  getFeladatokByTema: (temaNev, callback) => {
    const sql = 'SELECT * FROM lali.feladatok WHERE f_tema = ?';
    db.query(sql, [temaNev], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  getFeladatById: (feladatID, callback ) => {
    const sql = 'SELECT * FROM lali.feladatok WHERE f_id = ?';
    db.query(sql, [feladatID], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
    }
};

module.exports = FeladatokModel;
