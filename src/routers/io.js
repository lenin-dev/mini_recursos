import UserDB from '../class/user.class.js';
import MessageDB from '../class/message.class.js';

export default (io) => {

    const userDb = new UserDB();
    const messageDb = new MessageDB();

    io.on('connection', async (socket) => {

        // EMITE LOS USUARIOS CUANDO CARGA LA APP
        const users = await userDb.findUser();
        console.log('Usuario conectado: ', socket.id);
        socket.emit('users', users);

        // GUARDA EL USUARIO CUANDO ESCUCHA EL saveUsers
        socket.on('saveUsers', async (data) => {
            var saveUserM = await userDb.findUserOne(data.username);
            if(saveUserM === null ||saveUserM.length === 0) {
                saveUserM = await userDb.saveUser(data);
            }
            io.emit('users', await userDb.findUser());
            io.emit('loginUser', saveUserM);
        });


        // EMITE LOS MENSAJES CUANDO ABRES CHATS
        socket.on('oldMessages', async ({ senderId, receiverId }) => {
            const datos = await messageDb.findMessajeOne(senderId, receiverId);
            socket.emit('messagesOldSend', datos);
            // console.log('Mensajes anteriores:', datos);
        });

        // Crear sala privada entre dos usuarios
        socket.on('joinPrivateRoom', ({ senderId, receiverId }) => {
            const roomName = [senderId, receiverId].sort().join('-');
            socket.join(roomName);
            socket.emit('privateRoomJoined', { room: roomName });
        });

        // Enviar mensaje privado
        socket.on('privateMessage', async ({ senderId, receiverId, content }) => {
            const roomName = [senderId, receiverId].sort().join('-');
            await messageDb.saveMessaje({ sender: senderId, messageReceiver: receiverId, messageSend: content });
            io.to(roomName).emit('newMessage', { senderId, content });
        });

        socket.on('disconnect', () => {
            // onlineUsers.forEach((id, key) => {
            //     if (id === socket.id) {
            //         onlineUsers.delete(key);
            //     }
            // });
            // io.emit('updateUserList', Array.from(onlineUsers.keys()));
            console.log('Usuario desconectado:', socket.id);
        });
    });
    
}