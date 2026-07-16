import mongoose from "mongoose";
import dotenv from 'dotenv'; 

dotenv.config();

const dbConection = async ()=> {
    try{
        const dbURI = process.env.MONGODB_URI;
        const dbNAME = process.env.MONGODB_DB;

        await mongoose.connect(`${dbURI}/${dbNAME}`, {}); 
        console.log(`MongoDB is connected`)
    }catch (error){
        console.log(error); 
        process.exit(1);
    }
};

export default dbConection 