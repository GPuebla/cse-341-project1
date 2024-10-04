const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }).catch((err) => {
        res.status(500).json({ message: "Error fetching users", error: err });
    });
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
        const users = await result.toArray();
        
        if (users.length === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err });
    }
};

module.exports = {
    getAll, 
    getSingle
}