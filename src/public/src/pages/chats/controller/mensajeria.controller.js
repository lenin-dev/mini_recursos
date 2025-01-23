const socket = io();
var user;
// OBTENERLO DE LAS COOKIES
const cookies = document.cookie.split('; ');
const usernameCookie = cookies.find(row => row.startsWith('username='));
const stateCookie = cookies.find(row => row.startsWith('state='));
const username = usernameCookie ? usernameCookie.split('=')[1] : null;
const state = stateCookie ? stateCookie.split('=')[1] : null
if(username === null && state === null) {
    window.location.href = '../chats';
}

socket.on('users', (data) => {
    console.log(data);
    user = data;
    contactLoader(data);
});

function contactLoader(users) {
    var contact = '';
    var userContacts = document.querySelector('.contacts');
    for(let i in users) {
        contact += `<div class="contact">
                          <img src="https://via.placeholder.com/50" height="50" width="50" alt="User">
                          <div class="details">
                              <h4>${users[i].username}</h4>
                              <div>
                                  <div class="estado activo"></div>
                                  <p>${users[i].state ? 'Online' : 'Offline'}</p>
                              </div>
                          </div>
                      </div>`;
    }
    userContacts.innerHTML = contact;
}
