const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'This is a public route. No token required.' });
});

module.exports = router;
