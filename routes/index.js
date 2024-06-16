// routes/index.js
const express = require('express');
const router = express.Router();
const { format } = require('date-fns');

router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/menu');
  }
  res.render('index');
});

router.get('/menu', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }

  let lastAccess = req.cookies.lastAccess;
  if (lastAccess) {
    lastAccess = format(new Date(lastAccess), 'dd/MM/yyyy HH:mm:ss');
  }

  res.render('menu', { lastAccess });
});

module.exports = router;
