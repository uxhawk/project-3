const db = require('../models');

// Defining methods for the userFinancials controller
module.exports = {
  signupUser: function(req, res) {
    db.User
        .create(req.body)
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  findByEmail: function(req, res) {
    db.User
        .findOne({email: req.params.email},
            '_id userFinancials', function(err, obj) {
            })
        .then((dbModel) => res.json(dbModel))
        .catch((err) => res.status(422).json(err));
  },
  addTransaction: function(req, res) {
    db.User
      .update(
        { _id: req.params.id },
        {
          $push: {userFinancials: req.body}
        }
      )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  getAllTransactions: function(req, res) {
    db.User
      .find({_id: req.params.id}, 'userFinancials')
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  saveNewGoal: function(req, res) {
    db.User
      .update(
        {_id: req.params.id},
        {
          $push: { userGoals: req.body}
        }
      )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  getAllGoals: function (req, res) {
    db.User
    .find({_id: req.params.id}, 'userGoals')
    .then((dbModel) => res.json(dbModel))
    .catch((err) => res.status(422).json(err));
  }
};
