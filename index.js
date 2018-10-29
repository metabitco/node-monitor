let Register = require('@kbco/provider')
const Providers = new Register;

Providers.register({
    'cpus': require('./src/Providers/CPUProvider'),
    'disk': require('./src/Providers/DiskProvider'),
    'hostname': require('./src/Providers/HostnameProvider'),
    // 'http': require('./src/Providers/HttpProvider'),
    'interfaces': require('./src/Providers/NetworkInterfaceProvider'),
    'platform': require('./src/Providers/PlatformProvider'),
    'processes': require('./src/Providers/ProcessProvider'),
    'uptime': require('./src/Providers/UptimeProvider'),
    'user': require('./src/Providers/UserProvider'),
    'system': require('./src/Providers/SystemProvider'),
    'bios': require('./src/Providers/BiosProvider'),
    'baseboard': require('./src/Providers/BasebordProvider'),
    'battery': require('./src/Providers/BatteryProvider'),
    'graphics': require('./src/Providers/GraphicsProvider'),
    'memory': require('./src/Providers/MemoryProvider'),
    'os': require('./src/Providers/OsProvider'),
    'temp': require('./src/Providers/TemperatureProvider'),
});

module.exports = {
    getData: (callback) => {
        Promise.all(Object.values(Providers.available).map(available => available.boot()))
            .then((data) => {
                [
                    cpus,
                    disk,
                    hostname,
                    interfaces,
                    platform,
                    processes,
                    uptime,
                    user,
                    system,
                    bios,
                    baseboard,
                    battery,
                    graphics,
                    memory,
                    os,
                    temp,
                ] = data;

                callback({
                    cpus,
                    disk,
                    hostname,
                    interfaces,
                    platform,
                    processes,
                    uptime,
                    user,
                    system,
                    bios,
                    baseboard,
                    battery,
                    graphics,
                    memory,
                    os,
                    temp,
                })
            })
            .catch((e) => {
                console.log('some shit failed')
            })
    },
    Providers
}