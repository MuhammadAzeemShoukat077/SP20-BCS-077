const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = Schema({
  order: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("order", cartSchema);
// User is a name of Collection in DB
