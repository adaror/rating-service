const logger = require('../utils/logger');

async function relevantApp() {
    try {
        return true;
    } catch (err) {
        logger.error(`error in relevantApp - ${err.message} `,err);
        throw err;
    }
}

module.exports = {
    relevantApp
}