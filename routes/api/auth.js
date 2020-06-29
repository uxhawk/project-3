/* eslint-disable new-cap */
const router = require('express').Router();
const userFinancials = require('../../controllers/userFinancialController');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;


// Matches with "/api/auth/signup"
router.post('/signup', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(400).json({errors: err});
    }
    if (!user) {
      return res.status(400).json({errors: 'No user found'});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(400).json({errors: err});
      }
      return res.status(200).json(user.id);
    });
  })(req, res, next);
});

// Matches with "/api/auth/logout"
router.get('/logout', (req, res) => {
  console.log('logout route');
  req.logout();
  res.redirect('/login');
});


// Matches with "/api/auth/login"
router
    .route('/login')
    .get(userFinancials.findByEmail);


module.exports = router;
