const express = require('express');
const path = require('path');
const SocketIO = require('socket.io');

// Asignacion del objeto
const app = express();

//Consiguracion
app.set('port', process.env.PORT || 3000);

//Asignacion de carpeta statica
app.use(express.static(path.join(__dirname,"public")));

//Iniciar el servidor

const server = app.listen(app.get('port'),()=>{
    console.log("Server corriendo en puerto 3000");
});

// Socket io
const io = SocketIO(server);

io.on('connection', (socket)=>{
    console.log('Nueva Conexion;',socket.id);

    socket.on('chat:message',(data) => {
        console.log(data.message);
        socket.broadcast.emit('chat:message', data);
    });

    socket.on('chat:escribiendo',(data) => {
        socket.broadcast.emit('chat:escribiendo', data);
    });
});