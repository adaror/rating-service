const logger = require('../utils/logger');

async function relevantApp (req, res) {
    try {
        logger.info('hey');
        res.status(200).send('ok');
    } catch (err) {
        logger.error(`server error - ${err.message} `, err);
        res.status(500).send(err.message);
    }
}

module.exports = {
    relevantApp
}