const colors = require('./helpers/colors');

function createMenu(enableTwittSearch = false) {
    const menuHeader = '='.repeat(70)
    const menuQuit =
        ` 1. Type ${colors.FgGreen}quit(q)${colors.FgBlue} to exit`;
    const menuSearchGithub =
        ` 2. Type ${colors.FgGreen}search-github(sg)${colors.FgBlue} to search "reactive project in github"`;

    const menuSearchTwitts =
        ` 3. Type ${colors.FgGreen}search-twitter -{index of the project}${colors.FgBlue} to retrieve twitts ` +
        `\n related to the github project or type ${colors.FgGreen}st -{index of the project}${colors.FgBlue}` +
        `\n ex: ${colors.FgGreen}st -1${colors.FgBlue}`;

    const optionsMenu = [menuQuit, menuSearchGithub];

    if (enableTwittSearch) {
        optionsMenu.push(menuSearchTwitts);
    }

    const message = optionsMenu.join('\n');
    const promptMenu = `${colors.FgBlue}${menuHeader}\r\n${message}\r\n${menuHeader}${colors.FgWhite}\r\n> `

    return promptMenu;
}

function setPrompt(reader, enableTwittSearch) {
    const promptMenu = createMenu(enableTwittSearch);
    reader.setPrompt(promptMenu);
    reader.prompt();
}

module.exports = {
    setPrompt,
    createMenu
};