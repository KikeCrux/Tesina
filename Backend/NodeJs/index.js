const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar las rutas
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const wholesaleClientRoutes = require('./routes/wholesaleClientRoutes');
const orderRoutes = require('./routes/orderRoutes');
const packageRoutes = require('./routes/packageRoutes');
const componentRoutes = require('./routes/componentRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const locationRoutes = require('./routes/locationRoutes');
const orderDetailsRoutes = require('./routes/orderDetailsRoutes');
const locationsRoutes = require('./routes/locationsRoutes');
const writeFileRoutes = require('./routes/writeFile');

// Usar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wholesale-clients', wholesaleClientRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/order-details', orderDetailsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api', writeFileRoutes);

app.use(express.json());

// Ruta básica de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
