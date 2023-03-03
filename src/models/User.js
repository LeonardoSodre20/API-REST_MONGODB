const mongoose = require("mongoose");
const { Schema } = mongoose;

// CRIA UMA COLLECTION NO BANCO COM NOME PASSADO NO PARAMETRO

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  confirmPassword: String,
  role: String,
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
