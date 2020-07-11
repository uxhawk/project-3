/* eslint-disable new-cap */
const router = require('express').Router();
const userFinancials = require('../../controllers/userFinancialController');

// Matches with "/api/transactions/:id"
router
  .route("/:id")
  .post(userFinancials.saveNewGoal)
  .get(userFinancials.getAllGoals);


module.exports = router;
