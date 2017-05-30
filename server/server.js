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
    from:'john@sample.com',
    text:'Testing node websocket',
    createdAt: new Date()
  });

  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });

  socket.on('createMessage',(createMessage)=>{
    console.log('createMessage',createMessage);
  });
});

server.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`);
});
