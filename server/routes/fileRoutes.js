const express = require('express');
const router = express.Router();

const fileController = require('../controllers/fileController');

router.get('/files/:fileId', fileController.getFile);

module.exports = router;

