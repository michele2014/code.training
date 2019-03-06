const http = require('https');

function findProjects(config, query = "reactive") {

    const {
        github
    } = config;

    const options = {
        "hostname": github.hostname,
        "path": `${github.path}?q=${query}`,
        "headers": {
            "User-Agent": github.userAgent
        }
    };

    return new Promise((resolve, reject) => {
        http.get(options, res => {
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