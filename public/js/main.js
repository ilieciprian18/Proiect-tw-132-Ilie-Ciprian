const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//vrem sa obtinem username si room 
//Avem qs library importata in html
const {username,room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true

});



const socket= io();

//user joins camera de chat
socket.emit('joinRoom',{username,room});

//get room and users 
socket.on('roomUsers', ({room,users}) => {
    outputRoomName(room);
    outputUsers(users);

});

//Message de la server
socket.on('message',message =>{
    console.log(message);
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});



//Message submit, (e) este event paramether
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get message text
    const msg = e.target.elements.msg.value;

    //emit a message to the server
    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
});



//Output message la aplicatie
function outputMessage(message){
    const div= document.createElement('div');
    div.classList.add('message');
    div.innerHTML =  `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//add room name la appi
function outputRoomName(room){
    roomName.innerText = room;

}

//add users la appi

function outputUsers(users){
    userList.innerHTML =  `
    ${users.map(user =>  `<li>${user.username}</li>`).join('')}
    `;

}