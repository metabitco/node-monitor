const pretty = require('prettysize');
const df = require('node-df');

pretty(123456789, false, true, 3)

module.exports = {
    register() {
        return new Promise((resolve, reject) => {
            df(function (error, response) {
                if (error) { reject(error); }
             
                resolve(response);
            });

        })
    }
}