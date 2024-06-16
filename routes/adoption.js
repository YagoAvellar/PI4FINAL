// routes/adoption.js
const express = require('express');
const router = express.Router();
const interested = require('../models/interested');
const pets = require('../models/pet');
const adoptions = require('../models/adoption');

router.get('/new', (req, res) => {
  res.render('adoptionForm', { interested, pets });
});

router.post('/new', (req, res) => {
  const { interestedId, petId } = req.body;
  if (!interestedId || !petId) {
    return res.redirect('/adoption/new');
  }
  adoptions.push({ interestedId, petId, date: new Date().toISOString() });
  res.redirect('/adoption/list');
});

router.get('/list', (req, res) => {
  const adoptionList = adoptions.map(adoption => {
    const interestedPerson = interested.find(i => i.id === parseInt(adoption.interestedId));
    const pet = pets.find(p => p.id === parseInt(adoption.petId));
    return {
      interested: interestedPerson,
      pet,
      date: adoption.date
    };
  });
  res.render('adoptionList', { adoptionList });
});

module.exports = router;
