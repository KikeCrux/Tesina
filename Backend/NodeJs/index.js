const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Habilitar CORS para todas las solicitudes
app.use(cors());
app.use(express.json());

// Conexión a la base de datos MySQL con credenciales manuales
const db = mysql.createConnection({
    host: '85.31.234.90',               // Reemplaza con tu host
    user: 'kikecrux',                   // Reemplaza con tu usuario
    password: 'Mango2016.!',           // Reemplaza con tu contraseña
    database: 'pinatasdb',              // Reemplaza con el nombre de tu base de datos (ahora en minúsculas)
    port: 3306                          // Reemplaza con el puerto correcto (3306 es el predeterminado para MySQL)
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

    const hashedPassword = crypto.createHash('sha256').update(contrasena).digest('hex');

    const query = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(query, [correo], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuario = results[0];

        if (hashedPassword !== usuario.contrasena) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const usuarioRes = {
            id_usuario: usuario.id_usuario,
            correo: usuario.correo,
            nombre_cliente: usuario.nombre_cliente,
            tipo_usuario: usuario.tipo_usuario
        };

        res.json(usuarioRes);
    });
});

// Ruta para obtener los productos según el tipo de usuario
app.get('/productos', (req, res) => {
    const { id_usuario, tipo_usuario } = req.query;

    let query = '';
    let queryParams = [];

    if (!id_usuario) {
        query = `
        SELECT id_producto, nombre, precio_menudeo AS precio, imagen_url 
        FROM productos`;
    } else if (tipo_usuario === 'mayoreo') {
        query = `
        SELECT p.id_producto, p.nombre, pm.precio AS precio, p.imagen_url 
        FROM productos p 
        JOIN preciosmayoreo pm ON p.id_producto = pm.id_producto 
        WHERE pm.id_usuario = ?`;
        queryParams.push(id_usuario);
    } else {
        query = `
        SELECT id_producto, nombre, precio_menudeo AS precio, imagen_url 
        FROM productos`;
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los productos', error: err });
        }

        res.json(results);
    });
});

// Ruta para registrar usuarios de menudeo
app.post('/register', (req, res) => {
    const { correo, contrasena, nombre_cliente, telefono, tipo_usuario } = req.body;

    const queryCheck = 'SELECT * FROM usuarios WHERE correo = ?';

    db.query(queryCheck, [correo], (err, results) => {
        if (err) {
            console.error('Error en la consulta de verificación del correo:', err);
            return res.status(500).json({ message: 'Error en el servidor', error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const hashedPassword = crypto.createHash('sha256').update(contrasena).digest('hex');

        const queryInsert = `INSERT INTO usuarios (correo, contrasena, nombre_cliente, telefono, tipo_usuario)
                             VALUES (?, ?, ?, ?, ?)`;
        db.query(queryInsert, [correo, hashedPassword, nombre_cliente, telefono, tipo_usuario], (err, result) => {
            if (err) {
                console.error('Error al insertar el usuario:', err);
                return res.status(500).json({ message: 'Error al registrar el usuario', error: err });
            }
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
