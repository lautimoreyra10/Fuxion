const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Products");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Se requiere correo electrónico y contraseña");
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("El correo electónico ya existe");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hash,
    });
    await user.save();
    res.status(201).send("Usuario registrado correctamente");
  } catch (err) {
    res.status(500).send("Error en el servidor");
    console.error("Error:", err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Se requiere correo electrónico y contraseña");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Correo electrónico o contraseña incorrectos" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json("Correo electrónico o contraseña incorrectos");
    }
    const token = jwt.sign({ id: user._id }, "secret_key", { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login exitoso" });
  } catch (err) {
    res.status(500).send("Error en el servidor");
    console.error("Error:", err);
  }
});

router.post("/add-product", authenticateToken, async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;

  const product = new Product({
    name,
    description,
    price,
    category,
    imageUrl,
    user: req.user.id,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
