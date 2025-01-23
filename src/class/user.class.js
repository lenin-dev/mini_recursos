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

    async saveUser(id, data) {
        const datainfo = { ...data, id }
        const newUser = new UserModel(datainfo);
        const saveUserM = await newUser.save();
        return saveUserM;
    }
}