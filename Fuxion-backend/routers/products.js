const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const authenticateToken = require('../middlewares/authenticateToken'); // Asegúrate de tener este middleware
const checkRole = require('../middlewares/checkRole'); // Asegúrate de tener este middleware
// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'email'); // Opcional: poblamos la relación con el usuario
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Publicar un nuevo producto
router.post("/add-product", authenticateToken, checkRole('seller'), async (req, res) => {
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