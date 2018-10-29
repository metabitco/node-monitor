const si = require('systeminformation')

module.exports = {
    register() {
    },
    boot() {
        return new Promise((resolve, reject) => {
            si.osInfo().then(resolve).catch(reject)
        })
    }
}