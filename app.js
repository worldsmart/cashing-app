const express = require('express');
const bodyParser  = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.all('*', (req, res)=>{
    res.send('f123');
});

app.listen(8080, ()=>{
    console.log('App started on port:', process.env.DEPLOYED_TO ? process.env.DEPLOYED_TO : 8080);
});