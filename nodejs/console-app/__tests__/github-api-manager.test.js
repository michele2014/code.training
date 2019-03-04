const github = require('../api/github-api-manager');
jest.mock('https');

it('Should return a list of projects from Github', (done) => {

    github
        .findProjects()
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