// requiruing the library
const mongoose  = require('mongoose');

// to connect to database
mongoose.connect('mongodb://127.0.0.1/fizzFeed');

// to check whether the db is connected or not
const db = mongoose.connection;

//when server is up and running 
db.on('error',console.error.bind(console,'db connection error'));
db.once('open',function(){
    console.log('db connected !');
});