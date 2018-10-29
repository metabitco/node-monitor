const si = require('systeminformation')

module.exports = {
    register() {

    },
    boot() {
        return new Promise((resolve, reject) => {
            si.system().then(resolve).catch(reject)
        })
    }
}