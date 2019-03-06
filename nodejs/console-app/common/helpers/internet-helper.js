function checkInternet(cb) {
    require('dns').lookup('google.com', function (err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}

function testInternet() {
    checkInternet(function (isConnected) {
        if (!isConnected) {
            console.error('<< Your internet connection might be down!!! >>')
        }
    });
}

module.exports = {
    checkInternet,
    testInternet
}