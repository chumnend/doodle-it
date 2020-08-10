'use strict';

const router = require('express').Router();
const middleware = require('./middleware');
const authCtrl = require('./controllers/auth');
const doodleCtrl = require('./controllers/doodle');

// Authentication Routes
router.post('/v1/auth/register', authCtrl.register);
router.post('/v1/auth/login', authCtrl.login);

// Doodle Routes
router.get(
  '/v1/doodle/',
  middleware.checkQuery('userId'),
  middleware.verifyUser,
  doodleCtrl.getAll,
);
router.post(
  '/v1/doodle/',
  middleware.checkQuery('userId'),
  middleware.verifyUser,
  doodleCtrl.create,
);

router.get(
  '/v1/doodle/:id',
  middleware.checkQuery('userId'),
  middleware.verifyUser,
  doodleCtrl.getOne,
);
router.put(
  '/v1/doodle/:id',
  middleware.checkQuery('userId'),
  middleware.verifyUser,
  doodleCtrl.update,
);
router.delete(
  '/v1/doodle/:id',
  middleware.checkQuery('userId'),
  middleware.verifyUser,
  doodleCtrl.remove,
);

module.exports = router;
