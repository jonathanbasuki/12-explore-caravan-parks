const express = require('express');
const router = express.Router();

const { getHomePage, getAboutPage } = require('../controllers/Home.controller');

router.get('/', getHomePage);
router.get('/about', getAboutPage);

module.exports = router;