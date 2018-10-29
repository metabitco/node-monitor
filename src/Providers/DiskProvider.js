const si = require('systeminformation')

module.exports = {
    register() {

    },
    boot() {
        return new Promise((resolve, reject) => {
            si.fsSize().then(dataBits => {
                dataBits = dataBits.map(disk => {
                    disk.human_size = disk.size / 1000000000;
                    disk.human_used = disk.used / 1000000000;
                    return disk;
                })

                resolve(dataBits);
            })
            .catch(reject);
        })
    }
}
