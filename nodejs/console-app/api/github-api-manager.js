const http = require('https');

const GITHUB_URL = "https://api.github.com/search/repositories?q=";

function findProjects(query = "reactive") {
    const URL = GITHUB_URL + query;

    const options = {
        "hostname": "api.github.com",
        "path": "/search/repositories?q=reactive",
        headers: {
            "User-Agent": 'node.js'
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
}

function parseResponse(data) {
    const projects = JSON.parse(data);

    const res = projects.items.map(item => ({
        name: item.name,
        full_name: item.full_name
    }));

    return res;
}

module.exports = {
    findProjects
};