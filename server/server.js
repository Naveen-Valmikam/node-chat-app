const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');


var publicpath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicpath));

  io.on('connection',(socket)=>{
    console.log('New user connected');

    //socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

    socket.on('createMessage',(message,callback)=>{
      io.emit('newMessage',generateMessage(message.from,message.text));
      callback('This is from server');
      });

      socket.on('createLocationMessage',(coords)=>{
          io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
      });

    socket.on('disconnect',()=>{
      console.log('User disconnected');
    });
  });

server.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`);
});
