const express = require('express');
const routes = require('../miro/routes/router')
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next()
});

app.use(routes);

const port = 3030;
mongoose.connect('mongodb://127.0.0.1/pets')
    .then(
        app.listen(port, console.log(`App is listening on ${port}`))
    )
    .catch(err =>{
        console.log(err);
    })