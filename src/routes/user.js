const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { name, email, cpf, password } = req.body;

  const user = {
    name,
    email,
    cpf,
    role: "User",
    password,
    created_at: new Date(),
  };

  // ERRO AO TENTAR CRIAR UM USUÁRIO SEM DADOS
  if (!email) {
    return res.status(422).json({ message: "Preencha todos os campos !" });
  }

  try {
    await User.create(user);

    return res.status(201).json({ message: "Usuário criado com sucesso !" });
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
    const user = await User.findById(id);

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
