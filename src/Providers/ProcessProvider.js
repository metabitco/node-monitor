const si = require('systeminformation')
module.exports = {
    register() {

    },
    boot() {
        return new Promise((resolve, reject) => {
            si.processes().then(resolve).catch(reject)
        })
    }
}