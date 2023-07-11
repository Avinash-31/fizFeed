const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

// connecting to database
const db = require('./config/mongoose');

// to read the post requests
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// using express router
app.use('/',require('./routes'));

// view engine
app.set('view engine','ejs');
app.set('views','./views');

// to use assets
app.use(express.static('assets'));

app.listen(port,function(err){
    if(err){
        // console.log(err);
        // inerpolation
        console.log(`Error in running the server : ${err}`)
    }
    console.log(`Express Server is running on Port ${port}`);
});