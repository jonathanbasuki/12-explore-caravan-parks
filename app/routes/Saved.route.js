const express = require('express');
const router = express.Router();

const savedController = require('../controllers/Saved.controller');

router.post('/saved', savedController.saveCampsite);
router.get('/saved', savedController.getAllSavedCampsites);
router.get('/saved/:saved_id', savedController.getSavedDetail);
router.delete('/saved/:saved_id', savedController.removeSavedCampsite);

module.exports = router;