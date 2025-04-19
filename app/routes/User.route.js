const express = require('express');
const router = express.Router();

const userController = require('../controllers/User.controller');

router.get('/users', userController.getAllUsers);
router.get('/users/:user_id', userController.getUserDetail);

router.post('/users', userController.createUser);

router.put('/users/:user_id', userController.updateUserDetail);
router.put('/users/:user_id/delete', userController.softDeleteUser);

module.exports = router;