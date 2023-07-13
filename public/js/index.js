const socket = io();
const chatBox = document.getElementById('chatBox');
let usuario;
const conatiner = document.getElementById('container');

Swal.fire({
    title: 'Bienvenido a la sala de Chat',
    input: 'text',
    text: 'ingresa tu nombre para poder ingresar',
    allowOutsideClick: false,
    inputValidator: value => {
        if (!value) {
            return 'Por favor ingresa tu nombre!'
        }
    }
}).then(dato => {
    usuario = dato.value

    socket.emit('notificacion', usuario)
})





chatBox.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        if (chatBox.value) {
            const mensaje = chatBox.value;
            socket.emit('nuevoMensaje', { usuario, mensaje });
            chatBox.value = "";
        }
    }
})

socket.on('cargarMensajes', mensajes => {
    const cadaMensaje = document.createElement('p');
    mensajes.forEach(mensaje => {
        cadaMensaje.textContent = `${mensaje.usuario} dice: ${mensaje.mensaje}`;
        conatiner.appendChild(cadaMensaje);
    });
})


socket.on('notificar', user => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: `${user} se unió al chat`
    })
})

