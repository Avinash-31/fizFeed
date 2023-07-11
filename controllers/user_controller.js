const User = require('../models/user');

module.exports.profile = function (req, res) {
    // to check whether the user is authenticcated or not
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then((user)=>{
            return res.render('userProfile',{
                title: 'fizzFeed | Profile',
                user : user,
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }else{
        return res.redirect('/users/signIn');
    }

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
            return res.redirect('back');
            // Handle the error appropriately
        });

};

// sign in and creating a session for the user
module.exports.createSession = function (req, res) {
    // finding the user in the db
    User.findOne({email:req.body.email })
    .then((user)=>{
         // handle password which dont match
        if(user.password != req.body.password){
            console.log("Password incorrect");
            return res.redirect('back');
        }
        // handle session creation
        res.cookie('user_id',user.id);
        return res.redirect('/users/userProfile');
    })
    .catch((err)=>{
        console.error(`There was an issue with signing you in ${err}`)
    })

    // handling if user is found

   

    

    // handling is the user is not found
}