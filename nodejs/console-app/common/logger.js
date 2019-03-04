const winston = require('winston');
const FOLDER = '../logs/';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({
            filename: FOLDER + 'error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: FOLDER + 'combined.log'
        })
    ]
});

module.exports = logger;