const express = require('express');
const cors = require('cors');
const connectDB = require('./Fuxion-backend/db/db');
const authenticateToken = require('./Fuxion-backend/middlewares/authenticateToken');
const User = require('./Fuxion-backend/models/User');
const multer = require('multer');  // Importar multer
const path = require('path');
const app = express();

// Middleware de CORS
app.use(cors());

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Nombre único del archivo
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }  // Limitar el tamaño de archivos a 5 MB
});

// Conectar a la base de datos
connectDB();

// Aplicar express.json() solo en rutas que no manejen archivos
app.use(express.json({ limit: '10mb' }));

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

// Ruta para actualizar el perfil de usuario con subida de imagen
app.put('/api/users/profile', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los campos
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.address = req.body.address;
    user.document = req.body.document;
    user.card = req.body.card;

    // Si hay un archivo de imagen, actualizar el campo imageUrl
    if (req.file) {
      user.imageUrl = `/uploads/${req.file.filename}`;  // Guardar la ruta del archivo
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
});

// Hacer la carpeta 'uploads' accesible públicamente
app.use('/uploads', express.static('uploads'));

// Rutas
const userRoutes = require('./Fuxion-backend/routers/userRoutes');
app.use('/api/users', userRoutes);

const productRouter = require('./Fuxion-backend/routers/products');
app.use('/api/products', productRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
