const logger = require('../utils/logger');
const service = require('../services/service');

const strategies = {
    bronze: service.getBronzeStrategy,
    silver: service.getSilverStrategy,
    gold: service.getGoldStrategy
}

async function relevantApp (req, res) {
    try {
        const params = req.query;
        const result = await strategies[params.customerType](params);
        res.status(200).send(result);
    } catch (err) {
        logger.error(`server error - ${err.message} `, err);
        res.status(500).send(err.message);
    }
}

async function installApp (req, res) {
    try {
        const params = req.query;
        const result = await service.installApplication(params);
        
        if (!result) {
            res.status(404).send({err: 'The application is not exists'});
            return
        }
        res.status(200).send(result);
    } catch (err) {
        logger.error(`server error - ${err.message} `, err);
        res.status(500).send(err.message);
    }
}

module.exports = {
    relevantApp,
    installApp
}