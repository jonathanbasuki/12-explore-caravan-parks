const express = require('express');
const router = express.Router();

const homeController = require('../controllers/Home.controller');

router.get('/', homeController.renderHomePage);
router.get('/about', homeController.renderAboutPage);

module.exports = router;