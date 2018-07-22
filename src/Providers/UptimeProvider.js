const si = require('systeminformation');

const uptime = function () {
    return new Promise((resolve, reject) => {
        resolve(si.time());
    });
}

module.exports = {
    register() {

    },
    boot() {
        return new Promise((resolve, reject) => {
            uptime().then(resolve).catch(reject);
        })
    }
}