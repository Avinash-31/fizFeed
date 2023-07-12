const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');


// connecting to database
const db = require('./config/mongoose');

// passport session (used for sessio cookie)
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

// to store the session in cookie in mongodb so as to prevent frequent sign in to pages
const MongoStore = require('connect-mongo');

// middleware of sas to convert scss or sass files to css
// const sassMiddleWare = require('node-sass-middleware');

// to read the post requests
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// to use assets
app.use(express.static('assets'));

// extract style and scripts from sub pages into the layout
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'fizzfedd',
    // have to change the secret before deployment
    secret: 'yopeeps',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store:  MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1/fizzFeed',
            mongooseConnection : db,
            autoRemove : "disabled"
        },
        function(err){
            console.log(err || "connect-mongodb setup ok");
        }
    ),
}));

app.use(passport.initialize());
app.use(passport.session());

// to check about the session cookie data
app.use(passport.setAuthenticatedUser);

// using express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        // console.log(err);
        // inerpolation
        console.log(`Error in running the server : ${err}`)
    }
    console.log(`Express Server is running on Port ${port}`);
});