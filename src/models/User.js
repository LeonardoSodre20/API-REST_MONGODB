const mongoose = require("mongoose");

// CRIA UMA COLLECTION NO BANCO COM NOME PASSADO NO PARAMETRO

const User = mongoose.model("User", {
  name: String,
  email: String,
  cpf: String,
  password: String,
  role: String,
  created_at: Date,
});

module.exports = User;
