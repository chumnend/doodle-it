'use strict';

const express= require('express');
const router = express.Router();
const middleware = require('../middleware');
const { doodleController } = require('../controllers');

router.get(
  '/v1/doodle/',
  middleware.checkQuery('userId'),
  middleware.verifyUser,
  doodleController.getAll,
);

router.post(
  '/v1/doodle/',
  middleware.checkQuery('userId'),
  middleware.verifyUser,
  doodleController.create,
);

router.get(
  '/v1/doodle/:id',
  middleware.checkQuery('userId'),
  middleware.verifyUser,
  doodleController.getOne,
);

router.put(
  '/v1/doodle/:id',
  middleware.checkQuery('userId'),
  middleware.verifyUser,
  doodleController.update,
);

router.delete(
  '/v1/doodle/:id',
  middleware.checkQuery('userId'),
  middleware.verifyUser,
  doodleController.remove,
);

module.exports = router;
