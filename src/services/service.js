const logger = require('../utils/logger');
const rp = require('request-promise');
const db = require('../db');
const { randomApiUrl } = require('../config/config');
const config = require('../config/config');
const helpers = require('../utils/helpers');

//get the docs that match the category and return 2 random docs
async function getRandomDocsFromDb(numOfDoc = 2, category) {
    try {
        const result = await db.models['applications'].aggregate([
            {$match: {category: category.toLowerCase()}},
            {$sample: {size:numOfDoc}}
        ]);
        return result;
    } catch (err) {
        logger.error(`error in getRandomDocsFromDb - ${err.message} `,err);
        throw err;
    }
}

async function getBronzeStrategy({category}) {
    try {
        const result = await getRandomDocsFromDb(2, category);
        return result;
    } catch (err) {
        logger.error(`error in getBronzeStrategy - ${err.message} `,err);
        throw err;
    }
}

async function getSilverStrategy({category}) {
    try {
        const options = {
            method: 'GET',
            uri: config.randomApiUrl,
            json: true
        }
        //api call to get random number
        const numOfDocs = await rp(options);
        const result = await getRandomDocsFromDb(numOfDocs, category);
        return result;
    } catch (err) {
        logger.error(`error in getSilverStrategy - ${err.message} `,err);
        throw err;
    }
} 

async function getGoldStrategy({age, category}) {
    try {
        // to change the number of results just edit this parameter
        const numOfResults = 2;

        //get the applications with the desire category
        const applications = await db.models['applications'].find({category});

        //calculate the absolute value of the desire age minus the app average age and sort it
        const rakingApps = applications.sort((a, b) => Math.abs(age - a.averageAge) >  Math.abs(age - b.averageAge));

        return rakingApps.slice(0, numOfResults);
    } catch (err) {
        logger.error(`error in getGoldStrategy - ${err.message} `,err);
        throw err;
    }
}

async function installApplication({age, name}) {
    try {
        //set the age to integer
        age = parseInt(age);
        
        const application = await db.models['applications'].findOne({name: name.toLowerCase()});

        //check if application exists
        if (!application) {
            return false;
        }

        //calculate new average
        const numOfInstallers = application.numOfInstallers + 1;
        const sumOfAges = application.sumOfAges + age;
        const averageAge = helpers.calculateAverage(numOfInstallers, sumOfAges);

        //update in db
        const result = await db.models['applications'].findOneAndUpdate(
            {name},
            {$set: {numOfInstallers, sumOfAges, averageAge}},
            {upsert: true, new: true, useFindAndModify: false});
    
        return result;
    } catch (err) {
        logger.error(`error in installApplication - ${err.message} `,err);
        throw err;
    }
}



module.exports = {
    getBronzeStrategy,
    getSilverStrategy,
    getGoldStrategy,
    installApplication,
    getRandomDocsFromDb
}