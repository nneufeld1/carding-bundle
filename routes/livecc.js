const express = require('express');
const route = express.Router();
const utils = require('../utils');

route.get('/livecc', (req, res) => {
  res.render('livecc.ejs', {
    page: 'livecc',
  });
});

route.post('/charge', async (req, res) => {
  const randomEmail = utils.randomEmail(7) + '@gmail.com';
  const randomName = utils.randomEmail(8);
  const stripe = require('stripe')(req.body.stripe);
  try {
    await stripe.customers
      .create({
        name: randomName,
        email: randomEmail,
        source: req.body.token.stripeToken,
      })
      .then((customer) =>
        stripe.charges.create({
          amount: 50,
          currency: 'usd',
          customer: customer.id,
          description: 'Thank you for your order.',
        })
      )
      .then((data) => res.send(data))
      .catch((err) => res.send(err));
  } catch (err) {
    console.log('I am wrong');
  }
});

module.exports = route;
