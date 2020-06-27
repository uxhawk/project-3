// user model, email and password for authentication
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  financialTransactions: [
    {
      category: String,
      amount: Number,
      date: Date,
      notes: String,
    },
  ],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
