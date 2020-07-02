/* eslint-disable new-cap */
const router = require('express').Router();
const userFinancials = require('../../controllers/userFinancialController');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;


router.get('/get_credentials', (req, res) => {
  if (req.user) {
    res.status(200).json(req.user.id);
  } else {
    res.status(401).end();
  }
});

// Matches with "/api/auth/signup"
router.post('/register_login', (req, res, next) => {
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
      const userDetails = {
        _id: user._id,
        userFinancials: user.userFinancials
      }
      return res.status(200).json(userDetails);
    });
  })(req, res, next);
});

// Matches with "/api/auth/logout"
router.get('/logout', (req, res) => {
  req.logout();
  res.send('you logged out');
});

module.exports = router;
