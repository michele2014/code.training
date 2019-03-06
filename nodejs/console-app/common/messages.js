const colors = require('./helpers/colors');
const TAB = '  ';

function displayFeedback(message) {
    console.log(`${colors.FgYellow}${message}${colors.FgWhite}`)
}

function displayGithubProject(items) {
    displayFeedback(`Total of ${items.length} projects found.`);

    if (items.length > 0) {
        console.log('BEGIN LIST');
        items.forEach((item, index) => {
            console.log(`${TAB}${(index)}.${item.full_name}`);
        });
        console.log('END LIST');
    }
}

function displayTwitts(items) {
    displayFeedback(`Total of ${items.length} twitts found.`);

    if (items.length > 0) {
        console.log('BEGIN LIST');
        items.forEach((item, index) => {
            console.log(`${TAB}${(index)}. ${colors.FgGreen}[${item.created_at}] - ${item.text} ${colors.FgWhite}`);
        });
        console.log('END LIST');
    }
}

module.exports = {
    displayFeedback,
    displayGithubProject,
    displayTwitts
}