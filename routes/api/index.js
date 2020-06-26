/* eslint-disable new-cap */
const router = require('express').Router();
// const bookRoutes = require('./books');
const authRoutes = require('./auth-routes');

// Book routes
// router.use('/books', bookRoutes);
router.use('/auth', authRoutes);

module.exports = router;
