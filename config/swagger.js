import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.1',
    info: {
        title: 'Bot manager api doc',
        version: '0.0.1',
        description: 'Api documentation',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }],
    basePath: '/api/v1',
    servers: [
        {
            "url": "http://localhost:3000/api/v1",
            "description": "Development server"
        }
    ]
};

const swaggerOptions = {
    swaggerDefinition: swaggerDefinition,
    apis: [path.join(__dirname, '/../src/routes/v1/admin/*/*.swagger.js'), path.join(__dirname, '/../src/routes/v1/*/*.swagger.js')]
};

const swagger = swaggerJSDoc(swaggerOptions);

export default swagger;
