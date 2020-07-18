/* eslint-disable new-cap */
const router = require('express').Router();
const userFinancials = require('../../controllers/userFinancialController');

// Matches with "/api/transactions/:id"
router
    .route('/:id')
    .post(userFinancials.addTransaction)
    .get(userFinancials.getAllTransactions);


module.exports = router;
