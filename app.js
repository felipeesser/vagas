const express = require('express');
const app = express();
const morgan= require('morgan');

const rotaClientes =require('./routes/clientes');
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/clientes',rotaClientes);
app.use((error,req,res,next)=>{
    res.status(error.status||500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    })
})
module.exports = app;