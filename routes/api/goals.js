/* eslint-disable new-cap */
const router = require('express').Router();
const userFinancials = require('../../controllers/userFinancialController');

// Matches with "/api/transactions/:id"
router
  .route("/:id")
  .post(userFinancials.saveNewGoal)
  .put(userFinancials.updateGoals)
  .get(userFinancials.getAllGoals);
  // .delete(userFinancials.removeGoal);



module.exports = router;
