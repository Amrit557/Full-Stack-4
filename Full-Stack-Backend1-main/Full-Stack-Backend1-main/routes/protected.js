const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate');

router.get('/', authenticateToken, (req, res) => {
    res.json({ message: 'You have accessed a protected route with a valid token!' });
});

module.exports = router;
