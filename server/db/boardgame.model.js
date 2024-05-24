// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const BoardgameSchema = new Schema({
  name: String,
  maxPlayers: Number,
});

module.exports = mongoose.model("Boardgame", BoardgameSchema);
