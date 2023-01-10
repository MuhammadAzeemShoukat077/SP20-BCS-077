const orderScehma = require("../models/orderSchema");

const addItem = async (req, res) => {
  const { order, uid } = req.body;

  const newItem = new orderScehma({
    order: order,
    user: uid,
  });

  try {
    await newItem.save();
  } catch (err) {
    res.status(400).json({ error: " save Failed", errorDetail: err });
    return;
  }

  res.status(201).json({ message: "Order Confirmed" });
};

exports.addItem = addItem;
