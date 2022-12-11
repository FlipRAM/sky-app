const express = require('express');

const router = express.Router();

const testControl = require('../controllers/testController');

router.get('/', testControl.test);

module.exports = router;