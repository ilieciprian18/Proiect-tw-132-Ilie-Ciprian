const path= require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

const botName='Chatcord Bot';
//Run when a client connects
io.on('connection', socket => {
    socket.on('joinRoom' , ({username,room}) => {
        const user = userJoin(socket.id,username,room);


        socket.join(user.room);

        //Welcome current user
        socket.emit('message', formatMessage(botName,'Welcome to Chat!'));

        //Broadcast when a user connects ; emit oricui in afara de user
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat `));


        // user room si info
        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });


    //Preiau chat message-ul
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message',formatMessage(user.username, msg));
    });

    //cand paraseste chatul un user
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user)
        {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat `));
            io.to(user.room).emit('roomUsers',{
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });

});

//daca avem o variabila port o folosim pe aia daca nu mergem pe 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));