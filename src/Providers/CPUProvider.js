const si = require('systeminformation')

module.exports = {
    register() {

    },
    boot() {
        return new Promise((resolve, reject) => {
            si.currentLoad().then(resolve).catch(reject);
        })
    }
}