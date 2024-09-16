// index.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Importar cors

const app = express();
const port = 3000;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Conexión a la base de datos MySQL con credenciales manuales
const db = mysql.createConnection({
    host: 'localhost',              // Reemplaza con tu host
    user: 'root',                   // Reemplaza con tu usuario
    password: 'Sandia2016.!',       // Reemplaza con tu contraseña
    database: 'PinatasDB',          // Reemplaza con el nombre de tu base de datos
    port: 3307                      // Reemplaza con el puerto correcto (3306 es el predeterminado para MySQL)
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Ruta básica de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
