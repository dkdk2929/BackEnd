const OrderService = require('../services/OrderService');

const createOrder = async (req, res)=>{
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, user} = req.body;
    if (!orderItems || !shippingAddress || !paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !user){
        return res.status(200).json({
            status: 'ERR',
            message: 'The input is required'
        })
    }
    const order = await OrderService.createOrder(req.body);
    return res.status(200).json(order);
}

const deleteOrder = async (req, res)=>{
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            status: 'ERR',
            message: 'The input is required'
        })
    }
    const deletedOrder = await OrderService.deleteOrder(id);
    return res.status(200).json(deletedOrder);
}

const getOrder = async (req, res)=>{
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            status: 'ERR',
            message: 'The input is required'
        })
    }
    const order = await OrderService.getOne(id);
    return res.status(200).json(order);
}

const getAllOrder = async (req, res)=>{
    const orders = await OrderService.getAll();
    return res.status(200).json(orders);
}

const updateOrder = async (req, res) => {
    const updatedOrder = await OrderService.updateOne(req.body);
    return res.status(200).json(updatedOrder);
}

module.exports = {
    createOrder,
    deleteOrder,
    getOrder,
    getAllOrder,
    updateOrder
};
