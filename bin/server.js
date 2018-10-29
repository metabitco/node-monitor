function debug(message) {
    if (!!process.env.DEBUG) {
        console.log('[!] ' + message);
    }
}

function log(message) {
    console.log('[-] ' + message);
}
let thing = require('../index');
let express = require('express');
const path = require('path')
let app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

require('dotenv').config({
    path: path.join(__dirname, '/../.env')
})

app.use(express.static(path.join(__dirname, '/../public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

debug('Starting application');

app.get('/', function (req, res, next) {
    debug('Requesting data')
    thing.getData(({
                       cpus,
                       disk,
                       hostname,
                       interfaces,
                       platform,
                       processes,
                       uptime,
                       user,
                       system,
                       bios,
                       baseboard,
                       os,
                       graphics,
                       time,
                       temp,
                       battery,
                   }) => {
        debug('Sending data')
        req.send({
            cpus,
            disk,
            hostname,
            interfaces,
            platform,
            processes,
            uptime,
            user,
            system,
            bios,
            baseboard,
            os,
            graphics,
            time,
            temp,
            battery,
        })
    })

})

app.get('/d/:bit', function (req, res, next) {
    debug('Requesting bit: ' + req.params.bit);
    if (req.params.bit in thing.Providers.available) {
        thing.Providers.available[req.params.bit].boot()
            .then(data => {
                res.send(data);
            })
    } else {
        res.send({
            message: 'No data found for that provider.'
        })
    }
})

io.on('connection', function(socket){
    setInterval(() => {
        thing.getData(({
                           cpus,
                           disk,
                           hostname,
                           interfaces,
                           platform,
                           processes,
                           uptime,
                           user,
                           system,
                           bios,
                           baseboard,
                           os,
                           graphics,
                           time,
                           temp,
                           battery,
                       }) => {
            socket.emit('system-data',{
                cpus,
                disk,
                hostname,
                interfaces,
                platform,
                processes,
                uptime,
                user,
                system,
                bios,
                baseboard,
                os,
                graphics,
                time,
                temp,
                battery,
            })
        })
    }, 2000)
});

const edge = require('edge.js')

let router = require('@kbco/router')(app);

edge.registerViews(path.join(__dirname, '../resources/views'));

debug('Starting application');

router.get('/dash/home', function (req, res) {
    return edge.render('welcome')
});

debug('Starting server on port: ' + process.env.PORT || 40000)
http.listen(process.env.PORT || 40000, () => {
	console.log('Starting server on port: ' + process.env.PORT || 40000)
});
