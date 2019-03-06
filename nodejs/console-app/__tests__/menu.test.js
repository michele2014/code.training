const {
    createMenu
} = require('../common/menu');

describe('Check the menu items', () => {

    it('Should create a menu with 2 options, "quit(q)" and "search-github(sg)"', () => {
        const promptMenu = createMenu();
        expect(promptMenu).toMatch('quit(q)');
        expect(promptMenu).toMatch('search-github(sg)');
        expect(promptMenu).not.toMatch('search-twitter');
    });

    it('Should create a menu which contains the third menu "search-twitter"', () => {
        const promptMenu = createMenu(true);
        expect(promptMenu).toMatch('search-twitter');
    });

});