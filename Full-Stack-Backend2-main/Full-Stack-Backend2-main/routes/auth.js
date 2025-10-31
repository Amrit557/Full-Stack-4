const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = [{ username: 'user1', password: 'password123' }];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username }, 'secretkey123', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
