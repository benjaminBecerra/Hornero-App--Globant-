const User = require("../models/Users");

const favoritesController = {
  // Busca todos los favoritos
  all: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.send(user.favorites);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  // Agregar 1 favorito
  add: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        $push: {
          favorites: req.params.desk,
        },
      });
      res.sendStatus(201);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  // Eliminar 1 favorito
  remove: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.userId, {
        $pull: {
          favorites: req.params.desk,
        }, 
      });
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = favoritesController;
