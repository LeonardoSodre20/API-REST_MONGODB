const mongoose = require("mongoose");
require("dotenv").config();

const pass_DB = process.env.DB_PASS;
const user_DB = process.env.DB_USER;
const name_DB = process.env.DB_NAME;

mongoose.set("strictQuery", true);

async function main() {
  await mongoose.connect(
    `mongodb+srv://${user_DB}:${pass_DB}@cluster0.ttf8hkh.mongodb.net/${name_DB}?retryWrites=true&w=majority`
  );
  console.log("DATABASE Successful connection !");
}

main().catch((err) => console.log(err));

module.exports = main;
