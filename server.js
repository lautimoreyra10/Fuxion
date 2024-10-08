const express = require('express');
const cors = require('cors');
const authenticateToken = require('./Fuxion-backend/middlewares/authenticateToken.js');
const connectDB = require('./Fuxion-backend/db/db');
const app = express();


//Middlewares
app.use(cors());
app.use(express.json());

//Connect DB
connectDB();

//Routes

const userRoutes = require('./Fuxion-backend/routers/userRoutes');
app.use('/api/users', userRoutes);

const productRouter = require('./Fuxion-backend/routers/products');
app.use('/api/products', productRouter);

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
