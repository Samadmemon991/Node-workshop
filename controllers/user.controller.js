const User = require("../models/user.model");

async function getUsers(req, res) {
    try {
        const data = await User.find();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}
async function getUser(req, res) {
    try {
        id = req.params.id
        const data = await User.findById(id);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function createUser(req, res) {
    userData = req.body
    try {
        const data = await User.create(userData);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function deleteUser(req, res) {
    id = req.params.id;
    try {
        const data = await User.findByIdAndDelete(id);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

async function updateUser(req, res) {
    id = req.params.id;
    userData = req.body
    try {
        const data = await User.findByIdAndUpdate(id, userData);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.send("Something went wrong");
    }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }
