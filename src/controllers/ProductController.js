const ProductService = require('../services/ProductService')

const createProduct = async (req, res)=>{
    const {name, image, type, price, countInStock, rating, description, discount, sold} = req.body;
    if (!name || !image || !type || !price || !countInStock || !rating || !description || !discount || !sold){
        return res.status(200).json({
            status: 'ERR',
            message: 'The input is required'
        })
    }
    const product = await ProductService.createProduct(req.body);
    return res.status(200).json(product);
}

const deleteProduct = async (req, res)=>{
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            status: 'ERR',
            message: 'The input is required'
        })
    }
    const deletedProduct = await ProductService.deleteProduct(id);
    return res.status(200).json(deletedProduct);
}

const getProduct = async (req, res)=>{
    const id = req.params.id;
    if (!id) {
        return res.status(200).json({
            status: 'ERR',
            message: 'The input is required'
        })
    }
    const product = await ProductService.getOne(id);
    return res.status(200).json(product);
}

const getAllProduct = async (req, res)=>{
    const products = await ProductService.getAll();
    return res.status(200).json(products);
}

const updateProduct = async (req, res) => {
    const updatedProduct = await ProductService.updateOne(req.body);
    return res.status(200).json(updatedProduct);
}

module.exports = {
    createProduct,
    deleteProduct,
    getProduct,
    getAllProduct,
    updateProduct
};