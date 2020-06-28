const validationsMiddleware = require('../middlewares/validations.middleware');
const controller = require('../controllers/controller');

module.exports = function(app) {
  /**
   * @swagger
   * /appService/relevantApplication:
   *   get:
   *     tags:
   *      - Ranking Route
   *     description: Return the relevant app by params
   *     parameters:
   *     - in: query
   *       name: age
   *       description: The age of the user
   *       type: number
   *       required: true
   *     - in: query
   *       name: category
   *       description: Application category
   *       type: string
   *       required: true
   *     - in: query
   *       name: customerType
   *       description: Type of customer - can be only bronze, silver or gold
   *       type: string
   *       required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: user's relevant applications
   *       400:
   *         description: Input is not valid
   *       500:
   *         description: Error has occurred
   */
    app.get('/appService/relevantApplication',
        validationsMiddleware.validateRelevantAppSchema,
        controller.relevantApp
    )

 /**
   * @swagger
   * /appService/installedApps:
   *   post:
   *     tags:
   *      - Ranking Route
   *     description: Update installed app for user
   *     parameters:
   *     - in: query
   *       name: age
   *       description: The age of the user
   *       type: number
   *       required: true
   *     - in: query
   *       name: name
   *       description: The application name
   *       type: string
   *       required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: user install app successfully
   *       400:
   *         description: Input is not valid
   *       404:
   *         description: App is not exists
   *       500:
   *         description: Error has occurred
   */
  app.post('/appService/installedApps',
  validationsMiddleware.validateInstalledAppSchema,
  controller.installApp
)
}