const express = require("express");

const userRouter = require("./routes/userRouter");
const orderRouter = require("./routes/orderRouter");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/order", orderRouter);

mongoose
  .connect(
    "mongodb+srv://azeem:abcd1234@cluster0.ozc1vi9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error", err);
  });

app.listen(8000, () => {
  console.log("Server is connect on port 8000!");
});
