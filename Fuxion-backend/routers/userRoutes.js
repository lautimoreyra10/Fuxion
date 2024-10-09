const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Products");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password} = req.body;

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
      firstName,
      lastName,
      document,
      address,
      card,
      role: "user",
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

  // Verificar si se proporcionan el correo electrónico y la contraseña
  if (!email || !password) {
    return res.status(400).json({ message: "Se requiere correo electrónico y contraseña" });
  }

  try {
    // Buscar el usuario por el correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos" });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos" });
    }

    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Login exitoso' });
    
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});
router.post('/profile', authenticateToken, async (req, res) => {
  const { firstName, lastName, document, address, card } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizamos los datos del usuario
    user.firstName = firstName;
    user.lastName = lastName;
    user.document = document;
    user.address = address;
    user.card = card;
    user.role = 'seller';  // Asignamos el rol de 'seller' al completar el perfil

    await user.save();

    res.status(200).json({ message: 'Perfil completado. Ya puedes agregar productos y realizar compras.' });
  } catch (err) {
    res.status(500).json({ message: 'Error al completar el perfil' });
    console.error("Error:", err);
  }
});

module.exports = router;
