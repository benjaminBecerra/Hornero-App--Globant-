const UserSchema = require("../models/Users");
const ReservationsSchema = require("../models/Reservations");

const UserControllers = {

  //busca la reserva
  getAllReservations: async (req, res) => {
    let found = await ReservationsSchema.find({ user: req.params.id });
    res.json(found);
  }
  
  
};



module.exports = UserControllers;
