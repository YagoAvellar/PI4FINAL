// routes/interested.js
const express = require('express');
const router = express.Router();
const interested = require('../models/interested');

router.get('/new', (req, res) => {
  res.render('interestedForm');
});

router.post('/new', (req, res) => {
  const { name, email, phone } = req.body;
  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
  if (!name || !email || !phone) {
    return res.redirect('/interested/new');
  }
  if (!phoneRegex.test(phone)) {
    return res.render('interestedForm', { error: 'Número de telefone inválido' }); 
    return res.redirect('/interested/new');
  }
  interested.push({ name, email, phone });
  res.redirect('/interested/list');
});

router.get('/list', (req, res) => {
  res.render('interestedList', { interested });
});

module.exports = router;
