// routes/auth.js
const express = require('express');
const router = express.Router();

const USER = { username: 'admin', password: '12345' };

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    req.session.user = USER.username;
    res.cookie('lastAccess', new Date().toISOString());
    return res.redirect('/menu');
  }
  res.redirect('/auth/login');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;
