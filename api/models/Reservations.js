const { Schema, model } = require("mongoose");


const ReservationsSchema = new Schema({
  start: {
    type: String,
    required: true,
  },
  //campo parseado a date
  startDate: {
    type: Date,
    default: null
  },
  end: {
    type: String,
    required: true,
    default: "18:00"
  },
  allDay: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  booking: {
    type: String,
    default: null,
  },
  office: {
    type: Schema.Types.ObjectId,
    ref: "Office",
    default: null,
  },
}, 
);

//parseo a date para filtrar por fecha
ReservationsSchema.pre("save", function() {
  const date = this.start.slice(0, 10).split("-").reverse().join("-")+"T"+this.start.slice(11)
  return this.startDate = date
});




module.exports = model("Reservations", ReservationsSchema);

