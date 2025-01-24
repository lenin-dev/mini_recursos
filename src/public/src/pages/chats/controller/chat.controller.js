'use stric'

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
document.querySelector('.contacts').addEventListener('click', (e) => {
    let contact = e.target.closest('.contact');
    if (contact) {

        // COLOCAR FOTO DE PERFIL EN EL CHAT DE QUEIN HABLAS
        var imagenperfil = contact.querySelector('.imagen-perfil');
        if (imagenperfil) {
            document.querySelector('.perfil-chat').src = contact.querySelector('.imagen-perfil').src;
        }

        const username = document.querySelector('.username-chat');
        username.innerText = contact.querySelector('h4').innerText;

        var iduserChange = contact.querySelector('.idUsaer');
        if (iduserChange) {
            document.getElementById('idUserHidden').innerText = iduserChange.innerText;
        }

        // ELIMINA LOS MENSAJES CUANDO SE HACE CLICK A OTRO CHAT
        document.querySelector('.messages').innerHTML = '';

        const chatClose = chatArea.classList.contains('ocultar');
        const sidebarClose = sidebar.classList.contains('ocultar');

        if (!sidebarClose) {
            sidebar.classList.add('ocultar');
            chatArea.classList.remove('ocultar');
        } else if (!chatClose) {
            chatArea.classList.add('ocultar');
            sidebar.classList.remove('ocultar');
        }
    }
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
