const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Ruta absoluta al archivo JSON
const filePath = path.resolve(__dirname, '../data/paquetes.json');

// Endpoint para obtener el contenido del archivo JSON
router.get('/paquetes', (req, res) => {
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            res.status(200).json(JSON.parse(data));
        } else {
            res.status(404).send({ message: 'Archivo no encontrado' });
        }
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        res.status(500).send({ message: 'Error al leer el archivo' });
    }
});

// Endpoint para guardar datos en el archivo JSON
router.post('/save-paquetes', (req, res) => {
    const paquetes = req.body; // Datos enviados desde el frontend

    try {
        // Asegurarse de que la carpeta y el archivo existan
        const directoryPath = path.dirname(filePath);
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]', 'utf-8'); // Crear un archivo vacío si no existe
        }

        // Leer el archivo existente y agregar los nuevos datos
        const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const updatedData = [...existingData, ...paquetes];

        // Escribir los datos actualizados en el archivo JSON
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');
        res.status(200).send({ message: 'Paquetes guardados correctamente' });
    } catch (error) {
        console.error('Error al guardar el archivo:', error);
        res.status(500).send({ message: 'Error al guardar el archivo' });
    }
});

module.exports = router;
