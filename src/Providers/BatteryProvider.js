const si = require('systeminformation')

module.exports = {
    register() {
    },
    boot() {
        return new Promise((resolve, reject) => {
            si.battery().then(resolve).catch(reject)
        })
    }
}