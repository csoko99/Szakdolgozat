const TankonyvekModel = require('../models/tankonyvekModel');

const TankonyvekController = {
  getAll: (req, res) => {
    TankonyvekModel.getAll((err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  },
  
  getTemak: (req, res) => {
    console.log("Hello");
    const { tk_id } = req.params;
    TankonyvekModel.getTemakByTankonyvId(tk_id, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send('No topics found');
      console.log(results);
      res.json(results);
    });
  }
};

module.exports = TankonyvekController;
