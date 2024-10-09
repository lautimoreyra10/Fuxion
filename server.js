const express = require('express');
const cors = require('cors');
const connectDB = require('./Fuxion-backend/db/db');
const authenticateToken = require('./Fuxion-backend/middlewares/authenticateToken');
const User = require('./Fuxion-backend/models/User'); // Asegúrate de que el path sea correcto
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Rutas protegidas
app.get('/api/users/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta para actualizar el perfil de usuario
app.put('/api/users/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
});

// Routes
const userRoutes = require('./Fuxion-backend/routers/userRoutes');
app.use('/api/users', userRoutes);

const productRouter = require('./Fuxion-backend/routers/products');
app.use('/api/products', productRouter);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
