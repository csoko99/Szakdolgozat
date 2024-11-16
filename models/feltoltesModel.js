const db = require('../config/database');

const FeltoltesModel = {
    // Feladat hozzáadása
    addFeladat: (f_tankonyv_id, f_oldal_sz, f_tema, f_sorszam, f_tipus, f_leiras, f_modszerek, f_munkaformak, f_eszkozok, f_kep_url, callback) => {
        const sql = `
            INSERT INTO lali.feladatok (f_tankonyv_id, f_oldal_sz, f_tema, f_sorszam, f_tipus, f_leiras, f_modszerek, f_munkaformak, f_eszkozok, f_kep_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [f_tankonyv_id, f_oldal_sz, f_tema, f_sorszam, f_tipus, f_leiras, f_modszerek, f_munkaformak, f_eszkozok, f_kep_url];

        db.query(sql, values, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        });
    }
};

module.exports = FeltoltesModel;
