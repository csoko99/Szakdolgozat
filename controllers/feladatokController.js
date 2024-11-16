const FeladatokModel = require('../models/feladatokModel');

const FeladatokController = {
  getFeladatokByTema: (req, res) => {
    const temaNev = req.params.f_tema;
    FeladatokModel.getFeladatokByTema(temaNev, (err, results) => {
      if (err) {
        return res.status(500).send('Hiba történt a feladatok lekérdezése során');
      }
      res.json(results);
    });
  },
  getFeladatById: (req, res) => {
    const feladatId = req.params.f_id;
    FeladatokModel.getFeladatById(feladatId, (err, result) => {
    if(err) {
      return res.status(500).send('Hiba történt a feladat lekérdezése során');
    }
    res.json(result);
    });
  }
};

module.exports = FeladatokController;
