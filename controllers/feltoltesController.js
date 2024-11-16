const FeltoltesModel = require('../models/feltoltesModel');

const FeltoltesController = {
    // Az új feladat hozzáadása
    uploadFeladat: (req, res) => {
        const { 
            f_tankonyv_id, f_oldal_sz, f_tema, f_sorszam, 
            f_tipus, f_leiras, f_modszerek, f_munkaformak, 
            f_eszkozok, f_kep_url 
        } = req.body;

        FeltoltesModel.addFeladat(
            f_tankonyv_id, f_oldal_sz, f_tema, f_sorszam, 
            f_tipus, f_leiras, f_modszerek, f_munkaformak, 
            f_eszkozok, f_kep_url, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Hiba a feladat hozzáadása során', error: err });
            }
            res.json({ message: 'Feladat sikeresen hozzáadva!', result });
        });
    }
};

module.exports = FeltoltesController;
