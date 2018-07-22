const si = require('systeminformation')

module.exports = {
    register() {
    },
    boot() {
        return new Promise((resolve, reject) => {
            si.osInfo().then(({hostname}) => resolve({hostname})).catch(reject);
        })
    }
}