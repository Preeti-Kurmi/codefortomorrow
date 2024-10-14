const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
    createService, getServicesByCategory, updateService, deleteService
} = require('../controllers/serviceController');

router.post('/category/:categoryId/service', verifyToken, createService);

router.get('/category/:categoryId/services', verifyToken, getServicesByCategory);
router.put('/category/:categoryId/service/:serviceId', verifyToken, updateService);
router.delete('/category/:categoryId/service/:serviceId', verifyToken, deleteService);

module.exports = router;
