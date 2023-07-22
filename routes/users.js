var express = require('express');
const User = require('../models/user.model');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controller');
var router = express.Router();

router.get('/', function(req, res) {
    getUsers(req, res);
});

router.get('/:id', function(req, res) {
    getUser(req, res);
});

router.post('/', function(req, res) {
    createUser(req, res);
});

router.delete('/:id', function(req, res) {
    deleteUser(req, res);
});

router.patch('/:id', function(req, res) {
    updateUser(req, res);
});

module.exports = router;
