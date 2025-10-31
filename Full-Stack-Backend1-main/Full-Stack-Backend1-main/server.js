const express = require('express');
const app = express();
const PORT = 3000;

const logger = require('./middleware/logger');
const publicRoute = require('./routes/public');
const protectedRoute = require('./routes/protected');

app.use(logger);

app.use('/public', publicRoute);
app.use('/protected', protectedRoute);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
