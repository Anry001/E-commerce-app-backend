//including modules.
const dotenv = require("dotenv");
dotenv.config(); //creating secret keys to protect certain variables in the code.
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

//using express app modules.
const app = express();

//connecting the DB.
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull"))
  .catch((errorMsg) => console.log(`${errorMsg}`));

//CRUD operations.
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

//listening to ports.
app.listen(process.env.PORT || 5000, () =>
  console.log("backend server is running")
);
