const db_mongoose = require('./config/db_mongoose');
const routes = require('./routers/route');
const mongoose = require('mongoose');
const session = require('express-session');
const handlebars = require('express-handlebars');
const express = require('express');
const app = express();

app.engine('handlebars', handlebars ({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({secret: 'segredosecreto', saveUninitialized:true, cookie:{maxAge: 30*60*1000}}))

app.use(routes);
mongoose.connect(db_mongoose.connection,{useUnifiedTopology:true,useNewUrlParser:true}).then(()=>{
    console.log('Conectado com o BD');
}).catch((err)=>{
        console.log(err);
});

app.use(
    express.urlencoded({
      extended: true
    })
)

app.listen(8081, function(){
        console.log("Servidor no http://localhost:8081")
});