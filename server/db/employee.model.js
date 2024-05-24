// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  first: String,
  middle: String,
  last: String,
  address: {
    country: String,
    city: String,
    street: String,
    zipCode: Number,
  },
  level: String,
  position: String,
  attendance: {
    type: Boolean,
    default: false,
  },
  equipment: String,
  favoriteBrand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  favoriteColor: {
    type: String,
    default: '#FFFFFF'
  },
  boardGame: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Boardgame'
  },
  kittens: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kitten'
  }],
  startingDate: {
    type: Date,
    default: Date.now,
  },
  currentSalary: Number,
  desiredSalary: Number,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
