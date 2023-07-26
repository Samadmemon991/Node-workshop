const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

async function getCart(req, res) {
    try {
        const data = await Cart.find();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function createCart(req, res) {
    cartData = req.body
    cartData = await validateProducts(cartData)
    try {
        const data = await Cart.create(cartData);
        res.send("New cart created with id:" + data._id);
    } catch (err) {
        console.log(err);
        res.send(err._message);
    }
}

async function deleteCart(req, res) {
    id = req.params.id;
    try {
        const data = await Cart.findByIdAndDelete(id);
        if (data) {
            res.send("Cart deleted with id: " + data._id);
        } else {
            res.send("Cart not found.");
        }
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function updateCart(req, res) {
    id = req.params.id;
    cartData = req.body
    cartData = await validateProducts(cartData)

    try {
        const data = await Cart.findByIdAndUpdate(id, cartData);
        if (data) {
            res.send("Cart with id:" + data._id + " is updated.");
        } else {
            res.send("Cart not found.");
        }
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function validateProducts(cartData) {
    try {
        validCartProducts = [];
        for (const cartProduct of cartData.cartProducts) {
            const product = await Product.findById(cartProduct.productId, "available_quantity");
            if (product) {
                cartProduct.quantity = cartProduct.quantity > product.available_quantity ? product.available_quantity : cartProduct.quantity
                validCartProducts.push(cartProduct);
            }
        }
        cartData.cartProducts = validCartProducts

        return cartData
    } catch (error) {
        console.error('Error validating products:', error.message);
    }
}


module.exports = { getCart, createCart, deleteCart, updateCart }