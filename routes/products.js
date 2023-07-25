var express = require('express');
const Product = require('../models/product.model');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
var router = express.Router();
const { adminCheckMiddleware } = require('../middlware/auth');


router.get('/', function(req, res) {
    getProducts(req, res);
});

router.post('/', adminCheckMiddleware, function(req, res) {
    createProduct(req, res);
});

router.delete('/:id', adminCheckMiddleware, function(req, res) {
    deleteProduct(req, res);
});

router.patch('/:id', adminCheckMiddleware, function(req, res) {
    updateProduct(req, res);
});

module.exports = router;