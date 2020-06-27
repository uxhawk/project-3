const mongoose = require('mongoose');
const db = require('../models');

// This file empties the users collection and inserts the users below

mongoose.connect(
    process.env.MONGODB_URI ||
  'mongodb://localhost/tileMaster',
);

const userSeed = [
  {
    email: 'testing@gmail.com',
    password: '12345',
    financialTransactions: [
      {
        category: 'income',
        amount: 100,
        date: new Date(Date.now()),
      },
    ],
  },
];

db.User
    .remove({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then((data) => {
      console.log(data.result.n + ' records inserted!');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
