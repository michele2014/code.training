const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretKey';
const UNAUTHORIZED_MESSAGE = 'Unauthorized request!';

function generateToken(payload) {
    console.log('payload ' + payload)
    let token = jwt.sign(payload, SECRET_KEY,
        { expiresIn: 60 * 2 }
    );
    return token;
}

function unauthorized(res, message){
    return res.status(401).send(`${UNAUTHORIZED_MESSAGE}. ${message}`);
}

function verifyToken(req, res, next) {

    if (!req.headers.authorization) {
        return unauthorized(res, 'MISSING TOKEN');
    }

    let token = req.headers.authorization.split(' ')[1];

    if (token === 'null') {
        return unauthorized(res, 'NULL TOKEN'); 
    }

    let payloadExpired;
    let payload;

    jwt.verify(token, SECRET_KEY, function(err, decode) {
        if (err) {
            payloadExpired = err;
        } else {
            payload = decode;
        }
    });

    if (payloadExpired) {
        return unauthorized(res, payloadExpired);  
    }

    if (!payload) {
        return unauthorized(res, 'NULL paylod');  
    }

    req.userId = payload.subject;
    next();
}

module.exports = {
    generateToken,
    verifyToken
}