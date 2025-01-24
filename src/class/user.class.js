import { connectDB } from '../bin/mongo/mongo.js';
import UserModel from '../models/user.model.js';

connectDB();

export default class UserDB {

    async findUser() {
        const users = await UserModel.find()
        return users;
    }

    async findUserOne(username) {
        const user = await UserModel.findOne({ username });
        return user;
    }

    async saveUser(data) {
        const imagen = [
            "https://th.bing.com/th/id/R.d90ae22a82ceb11a2cb6db06ddfaa9c9?rik=bHBv7B1Gl1Zqjw&pid=ImgRaw&r=0",
            "https://static.vecteezy.com/system/resources/previews/009/475/144/original/fully-editable-pixel-art-illustration-pizza-for-game-development-graphic-design-poster-and-art-vector.jpg",
            "https://placebear.com/50/50",
            "https://www.kindpng.com/picc/m/187-1879486_50-by-50-pixel-hd-png-download-png.png",
            "https://th.bing.com/th/id/OIP.HPtW3Kl-1qvIjhcfNg7eZwHaFX?rs=1&pid=ImgDetMain",
            "https://img.itch.zone/aW1hZ2UvMTQ4NzYxLzcyNzgzNC5wbmc=/794x1000/7zh3Zr.png",
            "https://img.freepik.com/vector-premium/paisaje-pixeles-8-bits-luna-noche-arte-pixeles-ilustracion-vectorial-activos-juegos_614713-1283.jpg?w=1060",
            "https://pbs.twimg.com/media/E6IQKRzUUAAqKWG.png"
        ];
        const randomIndex = Math.floor(Math.random() * imagen.length);
        
        const newUser = new UserModel({ ...data, imagen: imagen[randomIndex] });
        const saveUserM = await newUser.save();
        return saveUserM;
    }

    async editUser(id, data) {
        const editUser = await UserModel.findByIdAndUpdate(id, data);
        return editUser;
    }
}