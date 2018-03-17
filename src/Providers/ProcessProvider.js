const ps = require('current-processes')
const os = require('os')

 module.exports = {
    register() {
        return new Promise((resolve, reject) => {
            resolve(os.networkInterfaces());
        })
    }
}