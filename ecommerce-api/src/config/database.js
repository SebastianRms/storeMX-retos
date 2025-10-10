import mongoose from "mongoose"; // Importa la librería mongoose para interactuar con MongoDB
import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno

dotenv.config(); // Carga las variables de entorno desde un archivo .env

const dbConection = async ()=> { // Declara una función asíncrona para conectar a la base de datos
    try{
        const dbURI = process.env.MONGODB_URI; // Obtiene la URI de MongoDB desde las variables de entorno
        const dbNAME = process.env.MONGODB_DB; // Obtiene el nombre de la base de datos desde las variables de entorno

        await mongoose.connect(`${dbURI}/${dbNAME}`, {}); // Conecta a MongoDB usando la URI y el nombre de la base de datos
        console.log(`MongoDB is connected`) // Muestra un mensaje si la conexión fue exitosa
    }catch (error){
        console.log(error); // Muestra el error en consola si la conexión falla
        process.exit(1); // Finaliza el proceso con un código de error
    }
};

export default dbConection // Exporta la función para usarla en otros