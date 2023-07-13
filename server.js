const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const viewsRouter = require('./routes/viewsRouter');
const socketServer = require('./utils/utils');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

const mensajes = []

const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`servidor corriendo en ${PORT}`));
const io = socketServer(httpServer);
io.on('connection', socket => {
    console.log('nuevo cliente conectado')

    socket.on('nuevoMensaje', data => {
        mensajes.push(data);
        io.emit('cargarMensajes', mensajes);
    })

    socket.on('notificacion', data => {
        socket.broadcast.emit('notificar', data)
    })
})


app.use('/', viewsRouter);


