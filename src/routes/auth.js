const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email: email });

  if (!userExist) {
    return res.status(404).json({ message: "Usuário não encontrado !" });
  }

  const checkPassword = await bcrypt.compare(password, userExist.password);

  if (!checkPassword) {
    return res.status(422).json({ message: "A Senha é Inválida !" });
  }

  try {
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        id: userExist._id,
      },
      secretKey
    );

    return res
      .status(200)
      .json({ message: "Autenticação realizado com sucesso !", token });
  } catch {
    return res
      .status(500)
      .json({ message: "Aconteceu algum erro no servidor..." });
  }
});

module.exports = router;
