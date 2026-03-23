const express = require('express');
const router = express.Router();

const { requireAdmin } = require('../middleware/requireAdmin');
const adminController = require('../controllers/adminController');

router.use(requireAdmin);

router.get('/stats', adminController.getRegistrationStats);
router.get('/registrations', adminController.listRegistrations);
router.delete('/registrations/:id', adminController.deleteRegistration);

module.exports = router;

