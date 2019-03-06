const readline = require('readline');

const {
    logApiResponse,
    logStartSession,
    logEndSession
} = require('./common/helpers/logger');

const {
    displayFeedback,
    displayGithubProject,
    displayTwitts
} = require('./common/messages');

const {
    setPrompt
} = require('./common/menu');

const github = require('./common/api/github-api-manager');
const twitter = require('./common/api/twitter-api-manager');

const config = require('./config.json');

logStartSession();

const reader = readline.createInterface(process.stdin, process.stdout);
reader.on('line', processCommand);

setPrompt(reader);

let githubProjects = [];

function processCommand(input) {

    const parsedInput = input.toLowerCase();

    if (parsedInput === "search-github" || parsedInput === "sg") {

        displayFeedback('Github search in progress...');
        githubSearchCommand();

    } else if (parsedInput.startsWith("search-twitter -") || parsedInput.startsWith("st -")) {

        const params = parsedInput.split('-');
        const selectedIndex = params.pop();

        if (isValidTwitterParams(githubProjects, selectedIndex, input)) {
            const selectedProject = githubProjects[selectedIndex].name;
            displayFeedback(`Twitter search for "${selectedProject}" in progress...`);
            twitterSearchCommand(selectedProject);
        }
    } else if (parsedInput === "quit" || parsedInput === "q") {
        exitCommand();
    } else {
        displayFeedback(`Command "${input}" not found`);
    }
}

async function githubSearchCommand() {
    try {
        const projects = await github.findProjects(config)
        githubProjects = projects.slice(0, 10);
        logApiResponse('Github', githubProjects);
        displayGithubProject(githubProjects);
        setPrompt(reader, true);
    } catch (err) {
        logApiResponse('Github', err);
    }
}


async function twitterSearchCommand(selectedProject) {
    try {
        const twitts = await twitter.findTwitts(config, selectedProject);
        logApiResponse('Twitter', twitts);
        setPrompt(reader, true);
        displayTwitts(twitts);
    } catch (err) {
        logApiResponse('Twitter', err);
    }
}

function exitCommand() {
    logEndSession();
    reader.close();
    process.exit(0);
}

function isValidTwitterParams(githubProjects, index, input) {
    const selectedIndex = parseInt(index);

    if (githubProjects.length === 0) {
        displayFeedback(
            `Command "${input}" is not allowed. ` +
            `You must first search for Github projects ` +
            `by running the command "sg"`);
        return false;
    }

    if (isNaN(selectedIndex)) {
        displayFeedback(`Command "${input}" is not valid.`);
        return false;
    }

    if (githubProjects.length < selectedIndex) {
        displayFeedback(
            `The index "${selectedIndex}" is out of the range. ` +
            `You must choose an index number between 0 and ${githubProjects.length-1}`);
        return false;
    }
    return true;
}