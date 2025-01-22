import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI);
        console.log('conectado a la base de datos');
    } catch (error) {
        console.log(error);
    }
}