const express = require('express');
const router = express.Router();

const exploreController = require('../controllers/Explore.controller');

router.get('/explore', exploreController.renderExplorePage);
router.get('/search', exploreController.renderResultPage);
router.get('/search/campground/:campground_id', exploreController.renderDetailPage);

module.exports = router;