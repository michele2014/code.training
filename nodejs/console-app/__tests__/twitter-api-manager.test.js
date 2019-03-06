const config = require('../config.json');
const twitter = require('../common/api/twitter-api-manager');
jest.mock('https');

it('Should return a list of twitters from ' +
    'Twitter which talks about the project', (done) => {

        const selectedProject = 'ReactiveSwift';

        twitter.
        findTwitts(config, selectedProject)
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