const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/Review.controller');

const authAuthenticator = require('../middleware/authAuthenticator');

router.post('/reviews', authAuthenticator.authenticateUser, reviewController.addCampgroundReview);
router.get('/reviews', reviewController.getCampgroundReview);
router.put('/reviews/:review_id', reviewController.updateCampgroundReview);
router.delete('/reviews/:review_id', reviewController.deleteCampgroundReview);

module.exports = router;