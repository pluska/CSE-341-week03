const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE-341 Project 2',
        description: 'Second project for wk03 and wk04',
    },
    host: 'https://cse-341-huiw.onrender.com',
    schemes: ['https'],
};

const output = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(output, endpointsFiles, doc)