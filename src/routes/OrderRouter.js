const express = require("express");
const router = express.Router();
const orderController = require('../controllers/OrderController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.get('/', authMiddleWare, orderController.getAllOrder)
router.get('/:id', authMiddleWare, orderController.getOrder)
router.post('/', authMiddleWare, orderController.createOrder)
router.patch('/', authMiddleWare, orderController.updateOrder)

module.exports = router
