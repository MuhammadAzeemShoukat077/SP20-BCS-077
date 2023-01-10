const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userschema = new Schema({
  name: String,
  password: { type: String },
  email: { type: String },
});

const User = mongoose.model("User", userschema);
module.exports = User;
// User is a name of Collection in DB
