const express = require('express');
const router = express.Router();

const homeController = require('../controllers/Home.controller');

/**
 * @route GET /
 * @description Render the homepage
 * @access Public
 */
router.get('/', homeController.renderHomePage);

/**
 * @route GET /about
 * @description Render the about page
 * @access Public
 */
router.get('/about', homeController.renderAboutPage);

module.exports = router;
