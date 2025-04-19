const express = require('express');
const router = express.Router();

const campgroundController = require('../controllers/Campground.controller');

router.get('/api/campgrounds', campgroundController.fetchCampgrounds);
router.get('/api/campgrounds/:campground_id', campgroundController.getCampgroundDetail);

module.exports = router;
