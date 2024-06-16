// routes/pet.js
const express = require('express');
const router = express.Router();
const pets = require('../models/pet');

router.get('/new', (req, res) => {
  res.render('petForm');
});

router.post('/new', (req, res) => {
  const { name, breed, age } = req.body;
  if (!name || !breed || !age || parseInt(age) < 0 || parseInt(age) > 100 ) {
    return res.redirect('/pet/new');
  }
  pets.push({ name, breed, age });
  res.redirect('/pet/list');
});

router.get('/list', (req, res) => {
  res.render('petList', { pets });
});

module.exports = router;
