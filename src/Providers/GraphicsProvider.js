const si = require('systeminformation')

module.exports = {
    register() {
    },
    boot() {
        return new Promise((resolve, reject) => {
            si.graphics().then(resolve).catch(reject)
        })
    }
}