const TankonyvekModel = require('../models/tankonyvekModel');

const TankonyvekController = {
  getAll: (req, res) => {
    TankonyvekModel.getAll((err, results) => {
      if (err) {
        return res.status(500).send('Hiba történt a lekérdezés során');
      }
      res.json(results);
    });
  },

  getTemak: (req, res) => {
    const tankonyvNev = req.params.tk_nev;
    TankonyvekModel.getTemakByTankonyvNev(tankonyvNev, (err, results) => {
      if (err) {
        return res.status(500).send('Hiba történt a témák lekérdezése során');
      }
      res.json(results);
    });
  }
};

module.exports = TankonyvekController;
