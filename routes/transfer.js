const express = require('express');
const router = express.Router();
const Account = require('../models/account');

router.post('/', async (req, res) => {
    const { sender, receiver, amount } = req.body;

    if (!sender || !receiver || !amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        const senderAcc = await Account.findOne({ username: sender });
        const receiverAcc = await Account.findOne({ username: receiver });

        if (!senderAcc) return res.status(404).json({ error: 'Sender account not found' });
        if (!receiverAcc) return res.status(404).json({ error: 'Receiver account not found' });
        if (senderAcc.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });

        senderAcc.balance -= amount;
        receiverAcc.balance += amount;

        await senderAcc.save();
        await receiverAcc.save();

        res.json({ message: `Transferred ${amount} from ${sender} to ${receiver}` });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
