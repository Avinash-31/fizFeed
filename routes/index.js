// express instance is created only once
const express = require('express');
const homeController = require('../controllers/home_controller');

const router = express.Router();
console.log('rounter setup done');

router.get('/',homeController.home );
// accessing other routes
// router.use('/routerName',require('./routerName'));
router.use('/users',require('./users'));
router.use('/about',require('./about'));

module.exports = router;

// refer passaport vid