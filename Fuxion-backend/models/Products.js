const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String }, // Opcional, para almacenar la URL de la imagen del producto
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Relación con el usuario
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;