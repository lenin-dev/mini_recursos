import { connectDB } from '../bin/mongo/mongo.js';
import MessageModel from '../models/message.model.js';

connectDB();

export default class MessageDB {

    async findMessajeOne(senderId, receiverId) {
        try {
            console.log('Sender:', senderId, 'Receiver:', receiverId);
            const messages = await MessageModel.find({
                $or: [
                    { sender: senderId, messageReceiver: receiverId },
                    { sender: receiverId, messageReceiver: senderId }
                ]
            }).sort({ createdAt: 1 });

            return messages;
        } catch (error) {
            throw new Error(`Error al buscar mensajes: ${error.message}`);
        }
    }

    async saveMessaje(data) {
        const newMessaje = new MessageModel(data);
        const saveMessajeM = await newMessaje.save();
        return saveMessajeM;
    }

}