const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/Users');
require('./services/passport');

const app = express();

app.use(
  cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey] })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI).then(
  () => {
    console.log(
      `MongoAtlas connection established. Starting the server on PORT ${PORT}`
    );
    app.listen(PORT);
  },
  (error) => {
    console.log('Error connecting to MongoAtlas:', error);
  }
);
