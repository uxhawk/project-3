/* eslint-disable new-cap */
const router = require('express').Router();
const userRoutes = require('./user');
const authRoutes = require('./auth');
const transactionRoutes = require('./transactions');
const goalRoutes = require('./goals');

// Financial routes
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/transactions', transactionRoutes);
router.use('/goals', goalRoutes);

module.exports = router;
