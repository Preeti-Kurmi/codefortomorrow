const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
    createCategory, getCategories, updateCategory, deleteEmptyCategory
} = require('../controllers/categoryController');

router.post('/category', verifyToken, createCategory);
router.get('/categories', verifyToken, getCategories);
router.put('/category/:categoryId', verifyToken, updateCategory);
router.delete('/category/:categoryId', verifyToken, deleteEmptyCategory);

module.exports = router;
