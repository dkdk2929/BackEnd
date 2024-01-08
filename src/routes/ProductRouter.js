const express = require("express");
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/', productController.getAllProduct)
router.get('/:id', productController.getProduct)
router.delete('/:id', productController.deleteProduct)
router.post('/', productController.createProduct)
router.patch('/', productController.updateProduct)

module.exports = router