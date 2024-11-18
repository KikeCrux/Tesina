const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Importar las rutas
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const wholesaleClientRoutes = require('./routes/wholesaleClientRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Usar las rutas
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', wholesaleClientRoutes);
app.use('/api', orderRoutes);
app.use('/api/paquetes', packageRoutes);

// Ruta básica de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
