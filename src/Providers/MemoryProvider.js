const si = require('systeminformation')

module.exports = {
    register() {
    },
    boot() {
        return new Promise((resolve, reject) => {
            si.mem().then(resolve).catch(reject)
        })
    }
}