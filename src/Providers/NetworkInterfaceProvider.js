const si = require('systeminformation');

 module.exports = {
    register() {
    },
    boot() {
        return new Promise((resolve, reject) => {
            si.networkInterfaces().then((interfaces) => {
                Promise.all(interfaces.map(item => {
                    return new Promise((res, reject) => {
                        si.networkStats(interfaces.iface, (stats) => {
                            item.stats = stats;
                            res(item);
                        });
                    })
                })).then(resolve);
            }).catch(reject);
        })
    }
}