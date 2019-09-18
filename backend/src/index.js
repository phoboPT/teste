require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();


server.start({
    cors: {
        credentials: true,
        origin: function (origin, callback) {
            if (process.env.FRONTEND_URL.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    },

}, deets => {
        console.log(`Server is now running on port http:/localhost:${deets.port}`);
});
