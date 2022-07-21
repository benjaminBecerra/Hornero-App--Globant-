const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  telephone: {
    type: Number,
  },
  position: {
    type: String,
  },
  mainOffice: {
    type: String,
  },
  favorites: {
    type: [String],
  },
  friends: {
    type: [String],
  },
  imgUrl: {
    type: String,
    default:
      "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
  },
  admin: {
    type: Boolean,
    default: false
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reservations",
    },
  ],
});

module.exports = model("User", UserSchema);
