const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// VARIÁVEIS DE AMBIENTE
const port = process.env.PORT;
const pass_DB = process.env.DB_PASS;
const user_DB = process.env.DB_USER;
const name_DB = process.env.DB_NAME;

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ROUTES

const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

mongoose
  .connect(
    `mongodb+srv://${user_DB}:${pass_DB}@cluster0.ttf8hkh.mongodb.net/${name_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connection made successfully !");
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => console.log(err));
