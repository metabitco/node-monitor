const si = require('systeminformation')

module.exports = {
    register() {

    },
    boot() {
        return new Promise((resolve, reject) => {
            si.cpu().then(resolve).catch(reject);
        })
    }
}