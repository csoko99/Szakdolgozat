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
  }
};

module.exports = FeladatokController;
