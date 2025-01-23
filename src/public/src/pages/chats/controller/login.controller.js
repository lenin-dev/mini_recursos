const formulario = document.querySelector('.login-form');
const username = document.getElementById('username');
const socket = io();

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
        document.cookie = `id=${data.id}; path=/;`;
        document.cookie = `username=${data.username}; path=/;`;
        document.cookie = `state=${data.state}; path=/;`;
        window.location.href = './chat.html';
    }
});
