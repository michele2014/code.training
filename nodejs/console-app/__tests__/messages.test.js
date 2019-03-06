const {
    displayFeedback,
    displayGithubProject,
    displayTwitts
} = require('../common/messages');

global.console = {
    log: jest.fn()
}

describe('Test message feedback', () => {

    it('Should console a message "Test"', () => {
        const TEST_MESSAGE = /TEST/;

        displayFeedback(TEST_MESSAGE);

        expect(global.console.log)
            .toHaveBeenCalledWith(expect
                .stringMatching(TEST_MESSAGE)
            );
    });
});


describe('Test message feedback message for Github', () => {
    it('Should console all github project names', () => {
        const mockItems = [{
            full_name: "name-1"
        }, {
            full_name: "name-2"
        }];

        displayGithubProject(mockItems);

        expect(global.console.log).toBeCalledTimes(mockItems.length + 3);
    });

    it('Should console zero github project names but one "Total" message', () => {
        displayGithubProject([]);
        expect(global.console.log).toBeCalledTimes(1);
    });
});

describe('Test message feedback message for Twitter', () => {

    it('Should console all twits', () => {
        const mockItems = [{
            created_at: new Date(),
            text: "name-1",
        }, {
            created_at: new Date(),
            text: "name-2"
        }];

        displayTwitts(mockItems);

        expect(global.console.log).toBeCalledTimes(mockItems.length + 3);
    });

    it('Should console zero github project names but one "Total" message', () => {
        displayTwitts([]);
        expect(global.console.log).toBeCalledTimes(1);
    });
});

afterEach(() => {
    global.console.log.mockClear();
});