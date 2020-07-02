/* eslint-disable new-cap */
const router = require('express').Router();
const userRoutes = require('./user');
const authRoutes = require('./auth');

// Book routes
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
