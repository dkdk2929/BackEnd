const Order = require("../models/OrderProduct");

const createOder = (body) => {
    return new Promise(async (resolve, reject) =>{
        const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, user} = body;
        const createdOrder = await Order.create({orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice, user});
        resolve({
            status: 'OK',
            message: 'SUCCESS',
            createdOrder
        })
    })
}

const deleteOrder = (id) => {
    return new Promise(async (resolve, reject) =>{
        const deletedOrder = await Order.findByIdAndDelete(id);
        resolve({
            status: 'OK',
            message: 'SUCCESS',
            deletedOrder
        })
    })
}

const getOne = (id) => {
    return new Promise(async (resolve, reject) =>{
        const order = await Order.findOne({_id:id});
        resolve({
            status: 'OK',
            message: 'SUCCESS',
            order
        })
    })
}

const getAll = () => {
    return new Promise(async (resolve, reject) =>{
        const orders = await Order.find();
        resolve({
            status: 'OK',
            message: 'SUCCESS',
            orders
        })
    })
}


const updateOne = (body) => {
    return new Promise(async (resolve, reject) => {
        const {id} = body;
        const updatedOrder = await Order.findOneAndUpdate({_id:id}, body, {new: true} );
        resolve({
            status: 'OK',
            message: 'SUCCESS',
            updatedOrder
        })
    })
}

module.exports = {
    createOder,
    deleteOrder,
    getOne,
    getAll,
    updateOne
}