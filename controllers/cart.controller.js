const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

async function getCart(req, res) {
    try {
        const data = await Cart.find().lean();
        if (data !== undefined && data.length != 0) {
            for (cart of data) {
                for (cartProducts of cart.cartProducts) {
                    if (cartProducts.productId) {
                        const productName = await getProductName(cartProducts.productId);
                        cartProducts.productId = productName;
                    }
                }
            }
            res.send(data);
        } else {
            res.send("Sorry no Products found");
        }
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
        res.status(500).send(err.message);
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

async function getProductName(productId) {
    try {
        const product = await Product.findById(productId);
        if (product) {
            return product.title;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        throw new Error("Error while fetching Product name.");
    }
}



module.exports = { getCart, createCart, deleteCart, updateCart }