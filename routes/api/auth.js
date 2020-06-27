/* eslint-disable new-cap */
const router = require('express').Router();
const userFinancials = require('../../controllers/userFinancialController');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;


// Matches with "/api/auth/signup"
router.post('/signup', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log('test1');
      return res.status(400).json({errors: err});
    }
    if (!user) {
      console.log('test2');
      return res.status(400).json({errors: 'No user found'});
    }
    req.logIn(user, function(err) {
      if (err) {
        console.log('test3');
        return res.status(400).json({errors: err});
      }
      return res.status(200).json({success: `logged in ${user.id}`});
    });
  })(req, res, next);
});

// Matches with "/api/auth/logout"
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});


// Matches with "/api/auth/login"
router
    .route('/login')
    .get(userFinancials.findByEmail);


module.exports = router;
