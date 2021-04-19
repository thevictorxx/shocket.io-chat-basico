const socket = io();

const containerMessage = document.getElementById('container-message');
const newMessage = document.getElementById('nuevoMensaje');
const btnEnviarMensaje = document.getElementById('btnEnviarMensaje');
const estadoMensajes = document.getElementById('estado-mensajes');

newMessage.addEventListener('keypress', (e)=>{
    if(e.code == "Enter"){
        sendNewMessage();
    }else{
        sendEscribiendo();
    }
});

function sendEscribiendo(){
    socket.emit('chat:escribiendo', {
        id : "Otro"
    });
};

function sendNewMessage(){
    containerMessage.innerHTML += `
    <div class="body-message">
        <div class="message-d">
            <span>
                ${newMessage.value}
            </span>
        </div>
    </div>
    `;
    
    socket.emit('chat:message', {
        message : newMessage.value
    });
    newMessage.value="";
}

btnEnviarMensaje.addEventListener('click', () => {
    sendNewMessage()
});



socket.on('chat:message', (data)=>{
    containerMessage.innerHTML += `
    <div class="body-message">
        <div class="message-i">
            <span>
                ${data.message}
            </span>
        </div>
    </div>
    `;
    estadoMensajes.innerHTML = "";
});

socket.on('chat:escribiendo', (data)=>{
    estadoMensajes.innerHTML = data.id + " Esta escribiendo...";
});