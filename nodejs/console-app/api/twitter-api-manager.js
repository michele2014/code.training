const http = require('https');
const qs = require("querystring");

const TWITTER_TOKEN = 'Bearer AAAAAAAAAAAAAAAAAAAAAH7a9QAAAAAAG44yKWGMdjORy%2FoVtlNnjgd2%2BDA%3DdCokIiWJYaA4ptjapZdBT2kPYdNUWdcZwjJR1ohfhJyUiVaVfi';
const TWITTER_URL = "https://api.twitter.com/1.1/search/tweets.json?q=ReactiveCocoa";


function findTwitts(query) {
    const options = {
        "method": "GET",
        "hostname": "api.twitter.com",
        "path": "/1.1/search/tweets.json?q=" + query,
        "headers": {
            "authorization": TWITTER_TOKEN
        },
        form: {
            grant_type: 'client_credentials'
        }
    };

    return new Promise((resolve, reject) => {
        http.get(options, (res) => {
                let data = '';

                res.on('data', chunk => data += chunk);

                res.on('end', () => {
                    const parsedResponse = parseResponse(data);
                    resolve(parsedResponse);
                });
            })
            .on("error", reject);
    });

};


function parseResponse(data) {
    const projects = JSON.parse(data);

    const res = projects.statuses.map(item => ({
        created_at: item.created_at,
        text: item.text
    }));

    return res;
}

module.exports = {
    findTwitts
}