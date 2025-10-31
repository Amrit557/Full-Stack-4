const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticate');

let accountBalance = 1000;

router.get('/balance', authenticateJWT, (req, res) => {
    res.json({ balance: accountBalance });
});

router.post('/deposit', authenticateJWT, (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid deposit amount' });
    accountBalance += amount;
    res.json({ message: `Deposited ${amount}`, balance: accountBalance });
});

router.post('/withdraw', authenticateJWT, (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid withdrawal amount' });
    if (amount > accountBalance) return res.status(400).json({ error: 'Insufficient balance' });
    accountBalance -= amount;
    res.json({ message: `Withdrew ${amount}`, balance: accountBalance });
});

module.exports = router;
