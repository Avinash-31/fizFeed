// express instance is created only once
const express = require('express');
const homeController = require('../controllers/home_controller');

const router = express.Router();
console.log('rounter setup done');
router.get('/',homeController.home );

module.exports = router;