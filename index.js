let Register = require('@kbco/provider')
const Providers = new Register;

Providers.register({
    'cpus': require('./src/Providers/CPUProvider'),
    'disk': require('./src/Providers/DiskProvider'),
    'hostname': require('./src/Providers/HostnameProvider'),
    'http': require('./src/Providers/HttpProvider'),
    'interfaces': require('./src/Providers/NetworkInterfaceProvider'),
    'platform': require('./src/Providers/PlatformProvider'),
    'processes': require('./src/Providers/ProcessProvider'),
    'uptime': require('./src/Providers/UptimeProvider'),
    'user': require('./src/Providers/UserProvider'),
});


var  [cpus,disk,hostname,interfaces,platform,processes,uptime,user] = [0,0,0,0,0,0,0,0,];
// io.on('connection', (socket) => {
    // var interval = setInterval(() => {
        Promise.all([
            Providers.loaded.cpus,
            Providers.loaded.disk,
            Providers.loaded.hostname,
            Providers.loaded.http,
            Providers.loaded.interfaces,
            Providers.loaded.platform,
            Providers.loaded.processes,
            Providers.loaded.uptime,
            Providers.loaded.user,
        ]).then((data) => {
            [
                cpus,
                disk,
                hostname,
                http,
                interfaces,
                platform,
                processes,
                uptime,
                user,
            ] = data;
            
            console.log({
                cpus,
                disk,
                hostname,
                http,
                interfaces,
                platform,
                processes,
                uptime,
                user,
            })
        })
    // }, 1000);

//     socket.on('disconnect', () => {
//         clearInterval(interval);
//     })
// })