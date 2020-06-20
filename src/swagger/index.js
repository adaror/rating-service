const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Ranking Application API Docs',
            description: 'Responsible for get relevant apps per user and install new apps',
            contact: {
                name: "Or Adar"
            },
            servers: ["http://localhost:8081"]
        }
    },
    apis: ['./src/routes/routes.js']
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)

module.exports = {
    swaggerDocs
}