const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname,'../public');  // using path for addressing is much easier and nicer thing to do //
var app = express();
app.use(express.static(publicPath));   // app.use(express.static(root))  root(absolute path) here must be from __dirname

const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
  res.render('index.html');
});

app.listen(port,() => {
  console.log(`App started on Port ${port}`);
});
