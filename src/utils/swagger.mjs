// import swaggerUi from 'swagger-ui-express';
import swaggerAutogen from 'swagger-autogen';
import { ENV } from '#config/index.mjs';

const doc = {
  info: {
    title: 'Express Auth APIs with Swagger',
    description: 'Express APIs documented with swagger-autogen',
    version: '1.0.0',
    contact: {
      name: 'Mubbasher Ashraf',
      email: 'support@gmail.com',
      url: 'https://github.com/Mubbasher-Ashraf',
    },
  },
  host: `localhost:${ENV.port}`,
  schemes: ['http'],
  basePath: '/api/v1',
};

const outputFile = '../swagger-output.json'; // This is where the generated file will be stored
const endpointsFiles = ['../routes/index.mjs']; // List of files with route definitions


swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  // Import and start the server only after swagger-output.json is generated
  await import('../index.mjs');
});

// Generate the Swagger documentation file and then run the app
