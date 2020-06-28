const express = require('express')
const app = express();
const { port } = require('./src/config/config');
const logger = require('./src/utils/logger');
const swaggerUi = require('swagger-ui-express');
const { swaggerDocs } = require('./src/swagger');
const { connectToDb } = require('./src/db');

//load docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//connect to db
connectToDb();
//loading routes
require('./src/routes/routes')(app);

app.listen(port, (err) => {
    if (err) {
        logger.error(`Error launching service : ${err}`);
        throw  err;
    }
    logger.info(`Ranking Service listening at http://localhost:${port}`)
});