const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');


var publicpath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicpath));

  io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage',(createMessage)=>{
      io.emit('newMessage',generateMessage(createMessage.from,createMessage.text));
      });

    socket.on('disconnect',()=>{
      console.log('User disconnected');
    });
  });
  
server.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`);
});
