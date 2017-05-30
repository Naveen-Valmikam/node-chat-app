const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;

var app = express();

var publicpath = path.join(__dirname,'../public');

app.use(express.static(publicpath));

app.listen(PORT,()=>{
  console.log(`Server started on port ${PORT}`);
});
