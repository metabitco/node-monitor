const si = require('systeminformation')

module.exports = {
    register() {
        return new Promise((resolve, reject) => {
            si.time().then(resolve)
        })
    }
}