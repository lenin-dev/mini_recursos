const formulario = document.querySelector('.login-form');
const username = document.getElementById('username');
const socket = io();

// OBTENERLO DE LAS COOKIES
const cookies = document.cookie.split('; ');
const usernameCookie = cookies.find(row => row.startsWith('username='));
const stateCookie = cookies.find(row => row.startsWith('state='));
const username2 = usernameCookie ? usernameCookie.split('=')[1] : null;
const state = stateCookie ? stateCookie.split('=')[1] : null
if(username2 !== null && state !== null || state === true) {
    window.location.href = './chat.html';
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    saveUsername(username.value);
});

const saveUsername = (userName) => {
    socket.emit('saveUsers', {
        username: userName,
        state: true
    });
};

socket.on('loginUser', (data) => {
    if(data != null) {
        document.cookie = `id=${data._id}; path=/;`;
        document.cookie = `username=${data.username}; path=/;`;
        document.cookie = `state=${data.state}; path=/;`;
        document.cookie = `img=${data.imagen}; path=/;`;
        window.location.href = './chat.html';
    }
});
