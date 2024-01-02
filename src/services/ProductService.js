const Product = require("../models/ProductModel");

const createProduct = (body) => {
    return new Promise(async (resolve, reject) =>{
        const {name, image, type, price, countInStock, rating, description, discount, sold} = body;
        const createdProduct = await Product.create({name, image, type, price, countInStock, rating, description, discount, sold});
        resolve({
            status: 'OK',
            message: 'SUCCESS',
            createdProduct
        })
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) =>{
        const deletedProduct = await Product.findByIdAndDelete(id);
        resolve({
            status: 'OK',
            message: 'SUCCESS',
            deletedProduct
        })
    })
}

const getOne = (id) => {
    return new Promise(async (resolve, reject) =>{
        const product = await Product.findOne({_id:id});
        resolve({
            status: 'OK',
            message: 'SUCCESS',
            product
        })
    })
}

const getAll = () => {
    return new Promise(async (resolve, reject) =>{
        const products = await Product.find();
        resolve({
            status: 'OK',
            message: 'SUCCESS',
            products
        })
    })
}

const updateOne = (body) => {
    return new Promise(async (resolve, reject) => {
        const {id} = body;
        const updatedProduct = await Product.findOneAndUpdate({_id:id}, body, {new: true} );
        resolve({
            status: 'OK',
            message: 'SUCCESS',
            updatedProduct
        })
    })
}

module.exports = {
    createProduct,
    deleteProduct,
    getOne,
    getAll,
    updateOne
}
