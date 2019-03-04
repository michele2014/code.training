const readline = require('readline');
const colors = require('./common/colors');

const github = require('./api/github-api-manager');
const twitter = require('./api/twitter-api-manager');

var reader = readline.createInterface(process.stdin, process.stdout);
reader.on('line', processCommand);
reader.on('close', exitCommand);

setPrompt(reader);

let githubProjects = [];

function processCommand(input) {

    const parsedInput = input.toLowerCase();

    if (parsedInput === "search-github" || parsedInput === "sg") {
        displayFeedback('Github search in progress...');

        github
            .findProjects()
            .then(projects => {
                    setPrompt(reader, true);
                    displayGithubProject(projects);
                    githubProjects = projects;
                },
                err => console.error(err)
            );

    } else if (parsedInput.startsWith("search-twitter -") || parsedInput.startsWith("st -")) {

        const params = parsedInput.split('-');
        const selectedIndex = params.pop();

        if (isNaN(selectedIndex)) {
            displayFeedback(`Command "${input}" is not valid.`);
            return;
        }

        if (githubProjects.length < selectedIndex) {
            displayFeedback(`The index "${selectedIndex}" is out of the range,
            you must choose and index number between 0 and ${githubProjects.length-1}`);
            return;
        }

        const selectedProject = githubProjects[selectedIndex].name;

        displayFeedback(`Twitter search for "${selectedProject}" in progress...`);

        twitter.
        findTwitts(selectedProject)
            .then(twitts => {
                setPrompt(reader, true);
                displayTwitts(twitts);
            })

    } else if (parsedInput === "quit" || parsedInput === "q") {
        reader.close();
    } else {
        displayFeedback(`Command "${input}" not found`);
    }
}

function setPrompt(reader, enableTwittSearch) {
    const menuHeader = `<< MENU APP >>`;
    const menuQuit =
        ` 1. Type quit(q) to exit`;
    const menuSearchGithub =
        ` 2. Type search-github(sg) to run search "reactive project in github"`;

    const menuSearchTwitts =
        ` 3. Type search-twitter -{index of the project} to retrieve twitts related` +
        `\nor type st -{index of the project}`;

    const optionsMenu = [menuQuit, menuSearchGithub];
    console.error('enableTwittSearch ' + enableTwittSearch)
    if (enableTwittSearch) {
        optionsMenu.push(menuSearchTwitts);
    }

    const promptMenu = displayMenu(menuHeader, optionsMenu.join('\n'));

    reader.setPrompt(promptMenu);
    reader.prompt();
}

function exitCommand() {
    process.exit(0);
}

function displayFeedback(message) {
    console.log(`${colors.FgYellow}${message}${colors.FgWhite}`)
}

function displayMenu(header, message) {
    return `${colors.FgBlue}${header}\r\n${message}${colors.FgWhite}\n> `
}

function displayGithubProject(items) {
    displayFeedback(`Total of ${items.length} projects found.`);

    console.log('BEGIN LIST');
    items.forEach((item, index) => {
        console.log(`${(index)}.${item.full_name}`);
    });
    console.log('END LIST');
}

function displayTwitts(items) {
    displayFeedback(`Total of ${items.length} twitts found.`);

    console.log('BEGIN LIST');
    items.forEach((item, index) => {
        console.log(`${(index)}. ${colors.FgGreen}[${item.created_at}] - ${item.text} ${colors.FgWhite}`);
    });
    console.log('END LIST');

}