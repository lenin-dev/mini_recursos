'use stric'

const chat = document.querySelectorAll('.contact');
const cerraChat = document.getElementById('cerrar-chat');
const chatArea = document.querySelector('.chat-area');
const sidebar = document.querySelector('.sidebar');

function verificarResolucion() {
    if (window.innerWidth <= 510) {
        chatArea.classList.add('ocultar');
    } else {
        chatArea.classList.remove('ocultar');
    }
}
verificarResolucion();
window.addEventListener('resize', verificarResolucion);

// Agregar eventos a cada contacto
chat.forEach(contact => {
    contact.addEventListener('click', () => {

        console.log('Se hizo clic en:', contact.querySelector('h4').innerText);

        const chatClose = chatArea.classList.contains('ocultar');
        const sidebarClose = sidebar.classList.contains('ocultar');
        
        if (!sidebarClose) {
            sidebar.classList.add('ocultar');
            chatArea.classList.remove('ocultar');
        } else if (!chatClose) {
            chatArea.classList.add('ocultar');
            sidebar.classList.remove('ocultar');
        }
    });
});

cerraChat.addEventListener('click', () => {
    const sidebarClose = sidebar.classList.contains('ocultar');
    if (sidebarClose) {
        sidebar.classList.remove('ocultar');
        if (window.innerWidth <= 510) {
            chatArea.classList.add('ocultar');
        }
    }
});
