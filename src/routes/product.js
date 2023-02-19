const router = require("express").Router();
const Product = require("../models/Products");

router.post("/", async (req, res) => {
  const { name, weight, status, price } = req.body;

  const product = {
    name,
    weight,
    status,
    price,
    created_at: new Date(),
  };

  try {
    await Product.create(product);
    return res
      .status(200)
      .json({ message: "Produto criado com sucesso !", product });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Não foi possível criar o produto !" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .json({ message: "Produtos listados com sucesso !", products });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Não foi possível listar os produtos !" });
  }
});

module.exports = router;
