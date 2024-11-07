const db = require('../config/database');

const TankonyvekModel = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM lali.tankonyvek';
    db.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      console.log(results);
      callback(null, results);
    });
  },

  getTemakByTankonyvId: (tk_id, callback) => {
    const sql = `
      SELECT DISTINCT lali.feladatok.f_tema 
      FROM lali.feladatok 
      INNER JOIN lali.tankonyvek 
      ON lali.feladatok.f_tankonyv_id = lali.tankonyvek.tk_id 
      WHERE lali.tankonyvek.tk_id = ?
    `;
    db.query(sql, [tk_id], (err, results) => {
      if (err) {
        console.error('SQL Error while fetching topics:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }
};

module.exports = TankonyvekModel;
