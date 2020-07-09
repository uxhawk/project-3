const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    category: String,
    amount: Number,
    date: Date,
    details: String,
    user: String,
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
