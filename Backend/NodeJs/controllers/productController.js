const db = require('../config/db');

// Controlador para obtener los productos
exports.getProducts = (req, res) => {
    const { id_usuario, tipo_usuario } = req.query;
    let query = '';
    let queryParams = [];

    if (!id_usuario) {
        query = `SELECT id_producto, nombre, precio_menudeo AS precio, imagen_url FROM productos`;
    } else if (tipo_usuario === 'mayoreo') {
        query = `
        SELECT p.id_producto, p.nombre, pm.precio AS precio, p.imagen_url 
        FROM productos p 
        JOIN preciosmayoreo pm ON p.id_producto = pm.id_producto 
        WHERE pm.id_usuario = ?`;
        queryParams.push(id_usuario);
    } else {
        query = `SELECT id_producto, nombre, precio_menudeo AS precio, imagen_url FROM productos`;
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los productos', error: err });
        }
        res.json(results);
    });
};
