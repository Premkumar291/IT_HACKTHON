const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { upload } = require('../middleware/uploads');

router.post(
  '/register-team',
  upload.fields([
    { name: 'pptFile', maxCount: 1 },
  ]),
  registrationController.registerTeam
);

module.exports = router;
