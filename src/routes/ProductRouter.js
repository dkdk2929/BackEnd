const express = require("express");
const router = express.Router();
const productController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.get('/', authMiddleWare, productController.getAllProduct)
router.get('/:id', authMiddleWare, productController.getProduct)
router.delete('/:id', authMiddleWare, productController.deleteProduct)
router.post('/', authMiddleWare, productController.createProduct)
router.patch('/', authMiddleWare, productController.updateProduct)

module.exports = router