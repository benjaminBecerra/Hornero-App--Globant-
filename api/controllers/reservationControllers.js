const ReservationsSchema = require("../models/Reservations");
const UserSchema = require("../models/Users");

const ReservationsController = {
  //crea una reserva
  create: async (req, res) => {
    let newReservation = await ReservationsSchema.create(req.body);
    let user = await UserSchema.findById(req.body.user)
    user.reservations.push(newReservation)
    user.save()
    res.json(newReservation);
  },
  //busca una reserva por id
  find: async (req, res) => {
    let found = await ReservationsSchema.findById(req.params.id);
    res.json(found);
  },
  //actualiza una reserva
  update: async (req, res) => {
    let updatedReservation = await ReservationsSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedReservation);
  },
  //elimina una reserva
  delete: async (req, res) => {
    let deletedReservation = await ReservationsSchema.findByIdAndRemove(
      req.params.id,
    );
    res.json(deletedReservation);
  },
  //busca todas las reservas de una oficina por id
  getAllReservationsByOffice: async (req, res) => {
    let found = await ReservationsSchema.find({
      office: req.params.id,
    }).populate("user");
    res.json(found);
  },
  //buscar todas las reservas futuras de una oficina por id
  getFutureReservationsByOffice: async (req, res) => {
    let found = await ReservationsSchema.find({
      office: req.params.id,
      startDate: { $gte: new Date() },
    }).populate("user");
    res.json(found);
  },
  //buscar todas las reservas pasadas de una oficina por id
  getPastReservationsByOffice: async (req, res) => {
    let found = await ReservationsSchema.find({
      office: req.params.id,
      startDate: { $lte: new Date() },
    }).populate("user");
    res.json(found);
  },

  //filtrar reservas pasadas
  getPastReservationsByUser: async (req, res) => {
    let found = await ReservationsSchema.find({
      user: req.params.id ,
      startDate: { $lte: (new Date()) },
    }).populate('office');
    res.json(found);
  },

  //filtrar reservas futuras
  getFutureReservationsByUser: async (req, res) =>{
    let found = await ReservationsSchema.find({
      user: req.params.id ,
      startDate: { $gte: (new Date()) },
    }).populate('office');
    res.json(found);
  },  

  //todas las reservas (admin)
  getAllReservations: async (req, res) =>{
    let found = await ReservationsSchema.find({allDay:true}).populate('office');
    res.json(found);
  },
};





module.exports = ReservationsController;
