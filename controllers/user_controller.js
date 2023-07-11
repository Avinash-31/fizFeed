const User = require('../models/user');

module.exports.profile = function (req, res) {
    res.end("<h1>Profile</h1>");
}

// to render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('userSignIn', {
        title: "fizzFeed | SignIn ",
    });
}

// to render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('userSignUp', {
        title: "fizzFeed | SignUp ",
    });
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    // User.findOne({ email: req.body.email })
    //     .then(user => {
    //         if (user) {
    //             return res.redirect('back');
    //         }

    //         return User.create(req.body);
    //     })
    //     .then(user => {
    //         res.redirect('/users/signIn');
    //     })
    //     .catch(err => {
    //         console.log("error in creating user in signup", err);
    //         return res.redirect('back');
    //     });

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

}