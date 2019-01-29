const express = require('express');
const router = express.Router();
const {
    generateToken,
    verifyToken
} = require('../helpers/jwt-manager');
const User = require('../models/user-schema');

const db = require('../helpers/db-manager');
db.connect();

router.get('/test', verifyToken, function(req, res, next) {
    res.send(`Your token is valid! :)`);
});

router.get('/', function(req, res, next) {
    const users = User.find();

    res.send(
        `
        <ul>
            <li>
                <form method="post" action = "/api/users/login">
                    <input name="user"/>
                    <input name="passoword"/>
                    <button>Login</button>
                </form>
            </li>
            <li>
            <form method="post" action = "/api/users/register">
                    <input name="user"/>
                    <input name="passoword"/>
                    <button>register</button>
                </form>
            </li>
            <li><a href="/api/users/logout" target="_blank">logout</a></li>
            <li><a href="/api/users/test" target="_blank">Test</a></li>
        </ul>
        <pre>
            ${JSON.stringify(users[0], 4)}
        </pre>
        `
    );
});

router.post('/login', function(req, res, next) {
    let userData = req.body;

    User.findOne({
            email: userData.email
        },
        (error, user) => {
            if (error) {
                console.error(error);
            } else if (!user) {
                res.status(401).send('invalid  email');
            } else if (user.password != userData.password) {
                res.status(401).send('invalid  password');
            } else {
                let payload = {
                    subject: user._id
                };
                let token = generateToken(payload);

                res.status(200).send({
                    token
                });
            }
        });
});

router.get('/logout', function(req, res, next) {
    // TO DO:
    // Set a reasonable expiration time on tokens
    // Delete the stored token from client side upon log out
    // Have DB of no longer active tokens that still have some time to live
    // Query provided token against The Blacklist on every authorized request
    res.send('You called LOG-OUT');
});

router.get('/search', function(req, res, next) {
    const users = User.find({}, (err, users) => {
        res.send(users);
    });
});

router.post('/', function(req, res, next) {
    let userData = req.body;

    let id;
     User.create({
            email: userData.email,
            password: userData.password
        },
        function(error, model) { 
            console.log(b.id) 
        }
    );
    res.status(200).send(id);
})

module.exports = router;