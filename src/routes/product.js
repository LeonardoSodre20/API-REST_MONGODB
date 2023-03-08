const router = require("express").Router();
const Product = require("../models/Products");

router.post("/", async (req, res) => {
  const { name, amount, status, price } = req.body;

  const product = {
    name,
    amount,
    status,
    price,
    created_at: new Date(),
  };

  if (!name) {
    return res.status(422).json({ message: "O campo nome é obrigatório !" });
  }

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
  const { search, pageSize } = req.query;

  try {
    if (search === "") {
      const products = await Product.find().limit(pageSize);
      return res.status(200).json({
        message: "Produtos listados com sucesso !",
        products,
      });
    } else {
      const products = await Product.find({
        name: search,
      }).limit(pageSize);

      return res.status(200).json({
        message: "Produtos listados com sucesso !",
        products,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Não foi possível listar os produtos !" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, amount, status, price } = req.body;

  const product = {
    name,
    amount,
    status,
    price,
    update_at: new Date(),
  };

  try {
    await Product.findByIdAndUpdate(id, product);
    return res
      .status(200)
      .json({ message: "Produto atualizado com sucesso !", product });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao atualizar o produto !" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Produto deletado com sucesso !" });
  } catch (err) {
    return res.status(500).json({ message: "Erro ao deletar o produto !" });
  }
});

module.exports = router;
