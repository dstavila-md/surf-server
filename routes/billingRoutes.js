const key = require('../config/keys');
const stripe = require('stripe')(key.stripeSecretKey);

module.exports = (app) => {
  app.post('/api/stripe', (req, res) => {});
};
