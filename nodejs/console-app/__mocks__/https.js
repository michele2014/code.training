const mockGithubData = require('../__mocks_data__/github-mock-data.json');
const mockTwitterData = require('../__mocks_data__/twitter-mock-data.json');

const http = {
    mockData: (options) => {
        switch (options.hostname) {
            case "api.github.com":
                return mockGithubData;
            case "api.twitter.com":
                return mockTwitterData;
            default:
                return {};
        }
    },
    get: (options, callBack) => {
        const mockData = http.mockData(options);

        const stringMockData = JSON.stringify(mockData);

        const res = {
            on: (listener, callBack) => callBack(stringMockData)
        }

        callBack(res);

        console.warn('mock http was called;');

        return {
            on: (listener, listenerCallBack) => null
        }
    }
}

module.exports = http;