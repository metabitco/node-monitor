const si = require('systeminformation');

 module.exports = {
    register() {
    },
    boot() {
        return new Promise((resolve, reject) => {
            si.networkInterfaces().then(resolve).catch(reject);
        })
    }
}