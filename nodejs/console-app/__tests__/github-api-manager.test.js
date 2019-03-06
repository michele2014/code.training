const config = require('../config.json');
const github = require('../common/api/github-api-manager');
jest.mock('https');

it('Should return a list of projects from Github', (done) => {

    github
        .findProjects(config)
        .then(data => {
                expect(data).toBeDefined();
                expect(data).not.toBeNull();
                expect(data.length).toBeGreaterThan(0);
                done();
            },
            err => {
                console.error(err);
                done();
            }
        );
});