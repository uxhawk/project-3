/* eslint-disable new-cap */
const router = require('express').Router();
const userRoutes = require('./user');
const authRoutes = require('./auth');
const transactionRoutes = require('./transactions');

// Financial routes
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
