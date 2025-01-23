import { Schema, model } from "mongoose";

const userSchema = new Schema({
    id: {
        type: String,
        required: [true, "El id es requerido"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "El nombre de usuario es requerido"],
        trim: true,
        // unique: true,
        minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
        maxlength: [20, "El nombre de usuario no debe superar los 20 caracteres"]
    },
    state: {
        type: Boolean,
        required: [true, "El estado es requerido"],
    }
}, {
    timestamps: true
});

export default model('User', userSchema);
