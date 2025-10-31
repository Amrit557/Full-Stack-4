const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const authRoutes = require('./routes/auth');
const bankingRoutes = require('./routes/banking');

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/bank', bankingRoutes);

app.listen(PORT, () => {
    console.log(`Banking API running on http://localhost:${PORT}`);
});
