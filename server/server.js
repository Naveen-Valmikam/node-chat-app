const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var publicpath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicpath));

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });

  socket.on('createMessage',(createMessage)=>{
    console.log('createMessage',createMessage);
    io.emit('newMessage',{
      from:createMessage.from,
      text:createMessage.text,
      createdAt:new Date().getTime()
    });
  });
});

server.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`);
});
