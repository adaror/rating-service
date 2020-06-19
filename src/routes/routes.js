const validationsMiddleware = require('../middlewares/validations.middleware');
const controller = require('../controllers/controller');

module.exports = function(app) {
    app.get('/appService/relevantApplication',
        validationsMiddleware.validateRelevantAppSchema,
        controller.relevantApp
    )
}