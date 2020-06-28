const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../config/config');

mongoose.model('applications', require('./schemas/applications.schema'));

async function connectToDb() {
    try {
        await mongoose.connect(config.dbUrl, { useNewUrlParser: true, 
            useCreateIndex: true ,
            useUnifiedTopology: true});
    } catch (err) {
        logger.error('error in connection to db - ', err);
        throw err;
    }
}

module.exports = {
  connectToDb,
  mongoose,
  models: mongoose.models
};