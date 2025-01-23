import UserDB from '../class/user.class.js';

export default (io) => {

    const userDb = new UserDB();
    io.on('connection', async (socket) => {
        // EMITE LOS USUARIOS CUANDO CARGA LA APP
        const users = await userDb.findUser();
        console.log(socket.id, 'conectado');
        socket.emit('users', users);

        // GUARDA EL USUARIO CUANDO ESCUCHA EL saveUsers
        socket.on('saveUsers', async (data) => {
            var saveUserM = await userDb.findUserOne(data.username);
            if(saveUserM === null ||saveUserM.length === 0) {
                saveUserM = await userDb.saveUser(socket.id, data);
            }
            io.emit('loginUser', saveUserM);
        });

        socket.on('disconnect', () => {
            console.log('Un cliente se desconectó: ' + socket.id);
        });
    });
    
}