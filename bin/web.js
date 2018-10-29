function debug(message) {
    if (!!process.env.DEBUG) {
        console.log('[!] ' + message);
    }
}

function log(message) {
    console.log('[-] ' + message);
}

const edge = require('edge.js')

let app = require('express')();

let router = require('@kbco/router')(app);

let path = require('path');

edge.registerViews(path.join(__dirname, '../views'));

debug('Starting application');

require('dotenv').config({
    path: path.join(__dirname, '/../.env')
})

router.get('/', function (req, res) {
    return edge.render('welcome')
});

debug('Starting server on port: ' + (process.env.WEB_PORT || 40001))

app.listen(process.env.WEB_PORT || 40001, () => (console.log('Listening on', process.env.WEB_PORT || 40001)));