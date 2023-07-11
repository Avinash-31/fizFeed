const express = require('express');

const router = express.Router();

const usersController = require('../controllers/user_controller');
 
router.get('/userProfile',usersController.profile); 
router.get('/signIn',usersController.signIn);
router.get('/signUp',usersController.signUp);

router.post('/create',usersController.create);
router.post('/createSession',usersController.createSession);

module.exports = router;