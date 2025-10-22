const key = require('../config/keys');
const stripe = require('stripe')(key.stripeSecretKey);

module.exports = (app) => {
  app.post('/api/stripe', async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ error: 'You must log in!' });
    }
    try {
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '5$ for 5 credits',
        source: req.body.id,
      });

      req.user.credits += 5;
      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      console.log('error billing user', error);
      res.status(500).send({
        error: 'An internal error has occured, please try again later',
      });
    }
  });
};
