const express = require('express');

const router = express.Router();

const testControl = require('../controllers/testController');
const userControl = require('../controllers/usersController');

router.get('/', testControl.test);

router.post('/user', userControl.createUser)

router.post('/sign', userControl.sign)

router.get('/search', userControl.searchUser)

module.exports = router;