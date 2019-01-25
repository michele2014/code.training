const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretKey';

function generateToken(payload) {
    let token = jwt.sign(payload, SECRET_KEY, { expiresIn: 60 * 1 });
    return token;
}

function verifyToken(req, res, next) {
    const UNAUTHORIZED_MESSAGE = 'Unauthorized request!';

    if (!req.headers.authorization) {
        return res.status(401).send(UNAUTHORIZED_MESSAGE);
    }

    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send(UNAUTHORIZED_MESSAGE);
    }

    let payloadExpired;
    let payload = jwt.verify(token, SECRET_KEY,
        function(err, decoded) {
            if (err) {
                payloadExpired = err;  
            }
        });

    if (payloadExpired) {
        return res.status(401).send(UNAUTHORIZED_MESSAGE + ' '+ payloadExpired);
    }

    if (!payload) {
        return res.status(401).send(UNAUTHORIZED_MESSAGE);
    }

    req.userId = payload.subject;
    next();
}

module.exports = {
    generateToken,
    verifyToken
}