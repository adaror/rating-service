const express = require('express')
const app = express();
const { port } = require('./src/config/config');
const logger = require('./src/utils/logger');

//loading routes
require('./src/routes/routes')(app);

app.listen(port, () => logger.info(`Ranking Service listening at http://localhost:${port}`));