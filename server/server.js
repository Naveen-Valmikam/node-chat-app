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

  socket.emit('newMessage',{
    from:'Admin',
    text:'Welcome to chat app',
    createdAt:new Date().getTime()
  });
  socket.broadcast.emit('newMessage',{
      from:'Admin',
      text:'New User joined',
      createdAt:new Date().getTime()
  });

  socket.on('createMessage',(createMessage)=>{
    io.emit('newMessage',{
      from:createMessage.from,
      text:createMessage.text,
      createdAt:new Date().getTime()
    });
  });

  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });


});

server.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`);
});
