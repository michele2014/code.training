const winston = require('winston');
const FOLDER = './logs/';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        // - Write all logs error (and below) to `error.log`
        new winston.transports.File({
            filename: FOLDER + 'error.log',
            level: 'error'
        }),
        // - Write to all logs with level `info` and below to `combined.log` 
        new winston.transports.File({
            filename: FOLDER + 'combined.log'
        })
    ]
});



function logApiResponse(api, result) {
    logger.info({
        api,
        result
    });
}

function logStartSession() {
    logger.info('APPLICATION START SESSION - ' + new Date().toLocaleString());
}

function logEndSession() {
    logger.info('APPLICATION END   SESSION -' + new Date().toLocaleString())
}


module.exports = {
    logger,
    logApiResponse,
    logStartSession,
    logEndSession
};