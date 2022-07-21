const User = require("../models/Users");
const { sendMailToFriend } = require("../config/mail");

const friendsController = {
  // Busca todos los amigos de 1 usuario
  all: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const promises = [];
      user.friends.forEach((friendId) =>
        promises.push(User.findById(friendId))
      );
      const allFriends = await Promise.all(promises);
      const friends = allFriends.map((friend) => {
        return {
          _id: friend._id,
          name: friend.name,
          surname: friend.surname,
          email: friend.email,
          position: friend.position,
          mainOffice: friend.mainOffice,
          imgUrl: friend.imgUrl,
        };
      });
      res.send(friends);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  // Agrega 1 amigo al usuario
  add: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.loggedUserId, {
        $push: {
          friends: req.params.userIdToAdd,
        },
      });
      res.sendStatus(201);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  // Elimina 1 amigo de la lista
  remove: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.loggedUserId, {
        $pull: {
          friends: req.params.userIdToDelete,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  // Enviar mensaje a un amigo
  sendMail: (req, res) => {
    try {
      const mail = {
        to: req.body.mailTo,
        from: req.body.mailFrom,
        body: req.body.mailBody,
      };
      sendMailToFriend(mail);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  // Busca en la lista de usuarios valores similares
  search: async (req, res) => {
    try {
      const search = req.params.searchInput.split(" ");
      if (search.length <= 1) {
        const users = await User.find({
          $or: [
            { name: { $regex: new RegExp(search[0], "i") } },
            { surname: { $regex: new RegExp(search[0], "i") } },
          ],
        });
        const usersToShow = users.map((user) => {
          return {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            mainOffice: user.mainOffice,
            imgUrl: user.imgUrl,
            position: user.position,
            email: user.email
          };
        });
        res.send(usersToShow);
      } else {
        const users = await User.find({
          name: { $regex: new RegExp(search[0], "i") },
          surname: { $regex: new RegExp(search[1], "i") },
        });
        const usersToShow = users.map((user) => {
          return {
           _id: user._id,
            name: user.name,
            surname: user.surname,
            mainOffice: user.mainOffice,
            imgUrl: user.imgUrl,
            position: user.position,
            email: user.email
          };
        });
        res.send(usersToShow);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = friendsController;
