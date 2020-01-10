const app = require('./app');

app.listen(8080, ()=>{
    console.log('App started on port:', process.env.DEPLOYED_TO ? process.env.DEPLOYED_TO : 8080);
});