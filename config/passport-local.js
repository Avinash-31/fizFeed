const passport = require('passport');

// getting the user form models
const User = require('../models/user');

// getting local strategy
const LocalStrategy = require('passport-local').Strategy;


// auth using passport-local
passport.use(new LocalStrategy({
    usernameField: 'email',
    },
    function(emailPass,passwordPass,done){
        // find a user and establish the identity
        User.findOne({email:emailPass})
        .then((user)=>{
            if(!user || user.password != passwordPass){
                console.log('Invalid username/password');
                return done(null,false);
            }
            return done(null,user); 
        })
        .catch((err)=>{
            console.log("Error in finding the user in passport ! ",err);
            return done(err);
        })
    }
));

// serialising the user to which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id); //automatically encryprted
});

// deserialising the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then((user)=>{
        return done(null,user);
    })
    .catch((err)=>{
        console.log("Error in finding user -- Passport local ");
        return done(err);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // is the user is signed in
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/signIn');
}

// 
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;