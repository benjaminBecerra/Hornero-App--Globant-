const UserSchema = require("../models/Users");
const ReservationsSchema = require("../models/Reservations")


const adminController = {
    //actualiza el usuario
  update: async (req, res) => {
    let updatedUser = await UserSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  },
  //trae todos los users
  get: async (req, res) => {
    let foundAllUsers = await UserSchema.find({});
    res.json(foundAllUsers)
  },
  delete: async (req, res) => {
    let deleted = await UserSchema.findByIdAndDelete(req.params.id)
    await ReservationsSchema.remove({user: req.params.id})
    res.json(deleted)
  }

}


module.exports= adminController;