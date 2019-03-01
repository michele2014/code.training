const readline = require('readline');
const colors = require('./colors');

const promptMenu = displayMenu(
    `<< MENU APP >>`,
    ` Insert a repo name or type quit(q) to exit: > `
);

var reader = readline.createInterface(process.stdin, process.stdout);
reader.setPrompt(promptMenu);
reader.prompt();

reader.on('line', processCommand);
reader.on('close', exitCommand);

function processCommand(input) {

    const parsedInput = input.toLowerCase();
    if (parsedInput === "quit" || parsedInput === "q") {
        reader.close();
    }

    displayFeedback(input);

    reader.prompt();
}

function exitCommand() {
    process.exit(0);
}

function displayFeedback(header, message) {
    console.log(`${colors.FgYellow}You insert: ${message}${colors.FgWhite}`)
}

function displayMenu(header, message) {
   return `${colors.FgBlue}${header}\r\n${message}${colors.FgWhite}`
}
