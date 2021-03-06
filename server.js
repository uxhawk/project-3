// require('dotenv').config();
const express = require('express');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const passport = require('./config/passport');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// express session
// app.use(
//     session({
//       secret: 'replace with environmental var',
//       resave: false,
//       saveUninitialized: false,
//       store: new MongoStore({mongooseConnection: mongoose.connection}),
//     }),
// );
app.use(session({secret: process.env.CLIENT_SEC,
  resave: true, saveUninitialized: true}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build/'));
} else {
  app.use(express.static('public'));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tileMaster');

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
