const http = require('https');
const config = require('../config.json');

function findTwitts(query) {
    const {
        twitter
    } = config;

    const options = {
        "hostname": twitter.hostname,
        "path": `${twitter.path}?q=${query}`,
        "headers": {
            "authorization": `Bearer ${twitter.token}`
        },
        "form": {
            "grant_type": twitter.form.grant_type
        },
        "method": "GET",
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