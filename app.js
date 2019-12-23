const express = require('express');
const bodyParser  = require('body-parser');
const { port } = require('./config');

const app = express();

app.use(bodyParser.json());

app.all('*', (req, res)=>{
    res.send('f');
});

app.listen(port, ()=>{
    console.log('App started on port ' + port);
});