const si = require('systeminformation')

module.exports = {
    register() {

    },
    boot() {
        return new Promise((resolve, reject) => {
            si.cpuTemperature().then(resolve).catch(reject)
        })
    }
}