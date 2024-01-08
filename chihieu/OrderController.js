const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})


// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('Không tìm thấy đơn hàng nào có ID này', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})


// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Đã giao hàng') {
        return next(new ErrorHandler('Bạn đã giao đơn đặt hàng này', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}

//Cart
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Sản phẩm không tồn tại', 404));
    }

    const order = await Order.findOne({ user: req.user._id });
    if (!order) {
        // Nếu chưa có đơn hàng, tạo một đơn hàng mới
        const newOrder = new Order({
            user: req.user._id,
            cart: [{ product: productId, quantity: quantity, price: product.price }],
            // ...các thông tin order khác
        });
        await newOrder.save();
    } else {
        // Nếu đã có đơn hàng, thêm sản phẩm vào giỏ hàng của đơn hàng đó
        const productIndex = order.cart.findIndex(item => item.product.toString() === productId);
        if (productIndex > -1) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            order.cart[productIndex].quantity += quantity;
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
            order.cart.push({ product: productId, quantity: quantity, price: product.price });
        }
        await order.save();
    }

    res.status(200).json({
        success: true,
        message: 'Sản phẩm đã được thêm vào giỏ hàng'
    });
});


// GET MONTHLY INCOME
exports.getMonthlyIncome = async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        let income = await Order.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: { // $project : chỉ định các field mong muốn truy vấn.
                    month: { $month: "$createdAt" },
                    sales: "$totalPrice",
                },
            },
            {
                $group: { // $group: nhóm các document theo điều kiện nhất định
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
}

