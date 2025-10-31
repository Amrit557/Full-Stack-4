const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const transferRoute = require('./routes/transfer');
const Account = require('./models/account');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use('/transfer', transferRoute);

mongoose.connect('mongodb://localhost:27017/bank', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB connected');

    const users = await Account.find({});
    if (users.length === 0) {
        await Account.create([{ username: 'Alice', balance: 1000 }, { username: 'Bob', balance: 500 }]);
        console.log('Sample accounts created: Alice ($1000), Bob ($500)');
    }
}).catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
