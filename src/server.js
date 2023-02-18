const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./database/config");

// VARIÁVEIS DE AMBIENTE
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ROUTES

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
