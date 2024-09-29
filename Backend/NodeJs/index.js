// index.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Habilitar CORS para todas las solicitudes
app.use(cors());
app.use(express.json());            // Middleware para manejar JSON

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

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;

    // Hashear la contraseña ingresada usando SHA-256
    const hashedPassword = crypto.createHash('sha256').update(contrasena).digest('hex');

    const query = 'SELECT * FROM Usuarios WHERE correo = ?';
    db.query(query, [correo], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuario = results[0];

        // Comparar la contraseña hasheada con la contraseña almacenada en la base de datos
        if (hashedPassword !== usuario.contrasena) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si las credenciales son correctas, devolver la información del usuario
        res.json({
            message: 'Inicio de sesión exitoso',
            usuario: {
                id_usuario: usuario.id_usuario,
                correo: usuario.correo,
                nombre_cliente: usuario.nombre_cliente,
                tipo_usuario: usuario.tipo_usuario
            }
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
