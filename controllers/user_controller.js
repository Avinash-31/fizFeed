const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('userProfile',{
        title:' fizzFeed | Profile ',
    });
}

// to render the sign in page
module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('userSignIn', {
        title: "fizzFeed | SignIn ",
    });
}

// to render the sign up page
module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('userSignUp', {
        title: "fizzFeed | SignUp ",
    });
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })
        .then((user) => {
            console.log(user);
            if (!user) {
                return User.create(req.body);
            }
            return Promise.resolve(user);
        })
        .then((user) => {
            return res.redirect('/users/signIn');
        })
        .catch((err) => {
            console.log("Error:", err);
            // Handle the error appropriately
        });

};


module.exports.createSession = function (req, res) {
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/');
    });
}