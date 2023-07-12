const express = require('express');
const passport = require('passport');

const router = express.Router();

const usersController = require('../controllers/user_controller');
 
router.get('/profile',passport.checkAuthentication,usersController.profile); 
router.get('/signIn',usersController.signIn);
router.get('/signUp',usersController.signUp);

router.post('/create',usersController.create);

// using passport as a middleware to authetnicate 
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: '/users/signIn'},
),usersController.createSession);
module.exports = router;

router.get('/signOut',usersController.destroySession); 