const Product = require("../models/product.model");

async function getProducts(req, res) {
    try {
        const data = await Product.find();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function createProduct(req, res) {
    productData = req.body
    try {
        const data = await Product.create(productData);
        res.send("New product created with id:" + data._id);
    } catch (err) {
        console.log(err);
        res.send(err._message);
    }
}

async function deleteProduct(req, res) {
    id = req.params.id;
    try {
        const data = await Product.findByIdAndDelete(id);
        if (data) {
            res.send("Product deleted with id: " + data._id);
        } else {
            res.send("Product not found.");
        }
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function updateProduct(req, res) {
    id = req.params.id;
    productData = req.body
    try {
        const data = await Product.findByIdAndUpdate(id, productData);
        if (data) {
            res.send("Product with id:" + data._id + " is updated.");
        } else {
            res.send("Product not found.");
        }
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}
module.exports = { getProducts, createProduct, deleteProduct, updateProduct }