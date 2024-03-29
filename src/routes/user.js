const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { name, email, lastname, password, confirmPassword } = req.body;
  const salt = await bcrypt.genSalt(12);
  const passUser = await bcrypt.hash(password, salt);
  const userAlreadyExists = await User.findOne({ email: email });

  if (userAlreadyExists) {
    return res
      .status(422)
      .json({ message: "Este E-mail já está cadastrado !" });
  }

  const user = {
    name,
    email,
    lastname,
    role: "User",
    password: passUser,
    confirmPassword: passUser,
    created_at: new Date(),
  };

  try {
    await User.create(user);
    return res
      .status(200)
      .json({ message: "Usuário Criado com sucesso !", user });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao criar um novo usuário !" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro ao listar todos os usuários !" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id, "-password");

    if (!user) {
      return res.status(422).json({ message: "Usuário não encontrado !" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar o usuário !" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, cpf } = req.body;

  const user = {
    name,
    email,
    cpf,
    updated_at: new Date(),
  };

  try {
    await User.findByIdAndUpdate(id, user, {
      returnOriginal: false,
    });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ message: "Erro ao atualizar o usuário !" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "Usuário deletado com sucesso !" });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao deletar o usuário !" });
  }
});

module.exports = router;
