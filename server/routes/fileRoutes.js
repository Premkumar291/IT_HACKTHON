const express = require('express');
const router = express.Router();

const { requireAdmin } = require('../middleware/requireAdmin');
const fileController = require('../controllers/fileController');

router.get('/files/:fileId', requireAdmin, fileController.getFile);

module.exports = router;

