'use strict';

const express= require('express');
const router = express.Router();
const { authController } = require('../controllers');

router.post('/v1/auth/register', authController.register);
router.post('/v1/auth/login', authController.login);

module.exports = router;
