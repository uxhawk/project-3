// user model, email and password for authentication
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    password: String,
    financialTransactions: [
        {
            category: String,
            amount: Number,
            date: Date
        }
    ],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
