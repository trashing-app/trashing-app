const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.put('/reduce/:id', UserController.reduceBalance);
router.put('/topup/:id', UserController.topupBalance);
router.patch('/location/:id', UserController.updateLocation);
router.get('/location/:id', UserController.getUserLocation);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
