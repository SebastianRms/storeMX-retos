import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/index.js'; 
import logger from './src/middlewares/logger.js';
import dbConection from './src/config/database.js';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express (); // Crea una instancia de la aplicación Express
dbConection(); // Conecta a la base de datos
app.use(express.json()); // Habilita el parseo de JSON en las solicitudes entrantes
app.use(logger); // Usa el middleware de logger para registrar las solicitudes

app.get('/', (req, res) => { // Ruta principal para la raíz del servidor
    res.send('Welcome!!'); // Responde con un mensaje de bienvenida
});
app.use('/api', (req, res, next) => {
  console.log('Request reached /api:', req.path);
  next();
});
app.use('/api', routes); // Usa las rutas definidas en categoryRoutes bajo el prefijo /api

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
