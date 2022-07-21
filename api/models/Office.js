const mongoose = require("mongoose");
const { Schema } = mongoose;

const OfficeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  floors: {
    type: [String],
  },
  maps: {
    type: [Object],
  },
  totalDesks: {
    type: Number,
  }
});

module.exports = mongoose.model("Office", OfficeSchema);
