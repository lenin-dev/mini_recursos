import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    sender: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messageReceiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messageSend: {
        type: String,
        required: [true, "El mensaje es requerido"],
        trim: true,
        minlength: [1, "El mensaje debe tener al menos 3 caracteres"],
        maxlength: [400, "El mensaje no debe superar los 1000 caracteres"]
    },
    chatRoom: {
        type: String,
        default: null 
    }
}, {
    timestamps: true
});

export default model('Message', messageSchema);