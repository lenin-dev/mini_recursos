const socket = io();
var user;
const header        = document.querySelector('.header');
const enviarMensaje = document.getElementById('mensaje_enviar');
const messaje       = document.querySelector('.text-mensaje');
// OBTENERLO DE LAS COOKIES
const cookies           = document.cookie.split('; ');
const idUserCookie      = cookies.find(row => row.startsWith('id='));
const usernameCookie    = cookies.find(row => row.startsWith('username='));
const stateCookie       = cookies.find(row => row.startsWith('state='));
const imagenCookie      = cookies.find(row => row.startsWith('img='));

const idUser            = idUserCookie ? idUserCookie.split('=')[1] : null;
const username          = usernameCookie ? usernameCookie.split('=')[1] : null;
const imagen            = imagenCookie ? imagenCookie.split('=')[1] : null;
const state             = stateCookie ? stateCookie.split('=')[1] : null
if(username === null && state === null) {
    window.location.href = '../chats';
}

socket.on('users', (data) => {
    user = data;
    contactLoader(data);
});

const usernameElement = document.querySelector('.username-chat');
const observer = new MutationObserver(() => {
    const userIdRecived = document.getElementById('idUserHidden').innerText;
    // console.log('El contenido del h4 ha cambiado:', usernameElement.innerText, userIdRecived);
    joinPrivateChat(userIdRecived);

    socket.emit('oldMessages', { senderId: idUser, receiverId: userIdRecived });
});
observer.observe(usernameElement, { childList: true, subtree: true });

socket.on('messagesOldSend', (data) => {
    for(let i in data) {
        if(idUser === data[i].sender) {
            document.querySelector('.messages').innerHTML += `<div class="message sent">${data[i].messageSend}</div>`;
        } else {
            document.querySelector('.messages').innerHTML += `<div class="message">${data[i].messageSend}</div>`;
        }
    }
    
})


function joinPrivateChat(userIdRecived) {
    selectedUserId = userIdRecived;
    socket.emit('joinPrivateRoom', { senderId: idUser, receiverId: selectedUserId });
}

// CONFIMACION DE LA CONEXION
socket.on('privateRoomJoined', ({ room }) => {
    console.log(`Te has unido a la sala privada: ${room}`);
});

enviarMensaje.addEventListener('submit', (e) => {
    e.preventDefault();
    const userIdRecived = document.getElementById('idUserHidden').innerText;
    const message = document.querySelector('.text-mensaje').value;
    
    if(userIdRecived === '') {
        alert('Debes seleccionar un contacto');
    } else if (message === '') {
        alert('Debes escribir un mensaje');
    } else {
        // console.log(idUser, userIdRecived, message);
        socket.emit('privateMessage', { senderId: idUser, receiverId: userIdRecived, content: message });
        // document.querySelector('.messages').innerHTML += `<div class="message sent">${message}</div>`;
        messaje.value = '';
    }
});

socket.on('newMessage', ({ senderId, content }) => {
    if(idUser === senderId) {
        document.querySelector('.messages').innerHTML += `<div class="message sent">${content}</div>`;
    } else {
        document.querySelector('.messages').innerHTML += `<div class="message">${content}</div>`;
    }
});


function contactLoader(users) {
    var contact = '';
    var userContacts = document.querySelector('.contacts');
    header.innerHTML = `<div class="contact">
                            <img src="${imagen}" class="imagen-perfil" height="50" width="50" alt="User">
                            <div class="details">
                                <h4>${username}</h4>
                                <p class="idUsaer" hidden>${idUser}</p>
                                <div>
                                <div class="estado activo"></div>
                                <p>${state ? 'Online' : 'Offline'}</p>
                                </div>
                            </div>
                        </div>`;

    for(let i in users) {
        if(users[i]._id !== idUser) {
            contact += `<div class="contact">
                        <img src="${users[i].imagen}" class="imagen-perfil" height="50" width="50" alt="User">
                        <div class="details">
                            <h4>${users[i].username}</h4>
                            <p class="idUsaer" hidden>${users[i]._id}</p>
                            <div>
                              <div class="estado activo"></div>
                              <p>${users[i].state ? 'Online' : 'Offline'}</p>
                            </div>
                        </div>
                    </div>`;
        }
    }
    userContacts.innerHTML = (contact);
}
