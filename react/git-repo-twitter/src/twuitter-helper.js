const BASE_URL = `https://api.twitter.com/1.1/search/tweets.json`;
const QUERY = `?q=twitterdev%20new%20premium`;
const url = BASE_URL + QUERY;

export default function findTwits() {
    console.log('===> findTwits')
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
        });
}