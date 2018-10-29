const Vue = require('vue')
const axios = require('axios')

import VueGoodTablePlugin from 'vue-good-table';

// import the styles
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(VueGoodTablePlugin);

new Vue({
    el: "#thing",
    data: {
        process_table: {
            columns: [
                {
                    label: "Name",
                    field: "name"
                },
                {
                    label: "process % CPU usage",
                    field: "cpu_percent_usage",
                    type: "percentage"
                },
                {
                    label: "process % mem usaeg",
                    field: "memory_percent_usage",
                    type: "percentage"
                },
                {
                    label: "PID",
                    field: "pid"
                }
            ],
            rows: []
        },
        processes: {},
        memory: {},
        cpus: {},
        disks: [],
        disk_table: {
            columns: [
                {
                    label: "Name",
                    field: "mount"
                },
                {
                    label: "total size",
                    field: "human_size"
                },
                {
                    label: "total used space",
                    field: "human_used"
                },
                {
                    label: "type",
                    field: "type"
                }
            ],
            rows: []
        },
        os: "",
        hostname: "",
        temp: {},
        interfaces: [],
        platform: {},
        graphics: [],
        battery: {},
        system: {},
        network_table: {
            columns: [
                {
                    label: "iface",
                    field: "iface"
                },
                {
                    label: "IPv4",
                    field: "ip4"
                },
                {
                    label: "IPv6",
                    field: "ip6"
                },
                {
                    label: "MAC",
                    field: "mac"
                },
                {
                    label: "interal",
                    field: "internal"
                }
            ],
            rows: []
        }
    },
    methods: {
        getProcesses() {
            axios.get("/d/processes").then(e => {
                this.processes = e.data;
                this.processes.list = this.processes.list.map(process => {
                    process.cpu_percent_usage = process.pcpu / 100;
                    process.memory_percent_usage = process.pmem / 100;
                    return process;
                });
                this.process_table.rows = this.processes.list;
            });
        },
        getMemory() {
            axios.get("/d/memory").then(res => {
                for (let bit in res.data) {
                    this.memory[bit] =
                        Math.round(res.data[bit] / 1024 / 1024 / 1024 * 100) /
                        100;
                }
            });
        },
        getCPU() {
            axios.get("/d/cpus").then(res => {
                for (let bit in res.data) {
                    if (
                        Number(res.data[bit]) === res.data[bit] &&
                        res.data[bit] % 1 !== 0
                    )
                        this.cpus[bit] = Math.round(res.data[bit] * 100) / 100;
                }
            });
        },
        getDisk() {
            axios.get("/d/disk").then(res => {
                this.disks = res.data.map(bits => {
                    bits.human_size = Math.round(bits.human_size * 1000) / 1000;
                    bits.human_used = Math.round(bits.human_used * 1000) / 1000;
                    return bits;
                });
                this.disk_table.rows = this.disks;
            });
        },
        getTemp() {
            axios.get("/d/temp").then(res => {
                this.temp = res.data;
            });
        },
        getHostname() {
            axios.get("/d/hostname").then(res => {
                this.hostname = res.data;
            });
        },
        getOs() {
            axios.get("/d/os").then(res => {
                this.os = res.data;
            });
        },
        getInterfaces() {
            axios.get("/d/interfaces").then(res => {
                this.interfaces = res.data;
                this.network_table.rows = this.interfaces;
            });
        },
        getPlatform() {
            axios.get("/d/platform").then(res => {
                this.platform = res.data;
            });
        },
        getGraphics() {
            axios.get("/d/graphics").then(res => {
                this.graphics = res.data;
            });
        },
        getBattery() {
            axios.get("/d/battery").then(res => {
                this.battery = res.data;
            });
        },
        getSystem() {
            axios.get("/d/system").then(res => {
                this.system = res.data;
            });
        }
    },
    computed: {
        free_space() {
            if (!this.defaultDisk) {return 0;}
            return (
                Math.round(
                    (this.defaultDisk.human_size - this.defaultDisk.human_used) * 100
                ) / 100
            );
        },
        defaultDisk() {
            for(let id in this.disks) {
                console.log(this.disks)
                if (this.disks[id].mount === '/') {
                    return this.disks[id]
                }
            }
        },
        displayCount () {
            if (typeof this.graphics.displays === 'object') {
                return this.graphics.displays.length
            }
            return 0;
        }
    },
    mounted() {
        this.getProcesses();
        this.getMemory();
        this.getCPU();
        this.getDisk();
        this.getTemp();
        this.getHostname();
        this.getOs();
        this.getInterfaces();
        this.getPlatform();
        this.getGraphics();
        this.getBattery();
        this.getSystem();
        var socket = io();
        socket.on('system-data',({
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
             os,
             graphics,
             time,
             temp,
             battery
         }) => {
            console.log('UPdating');
            this.cpus = cpus;
            this.disks = disk;
            this.hostname = hostname;
            this.interfaces = interfaces;
            this.platform = platform;
            this.processes = processes;
            this.processes.list = this.processes.list.map(process => {
                process.cpu_percent_usage = process.pcpu / 100;
                process.memory_percent_usage = process.pmem / 100;
                return process;
            });
            this.process_table.rows = this.processes.list;

            this.uptime = uptime;
            this.user = user;
            this.system = system;
            this.bios = bios;
            this.baseboard = baseboard;
            this.os = os;
            this.graphics = graphics;
            this.time = time;
            this.temp = temp;
            this.battery = battery;
            this.network_table.rows = this.interfaces;
            this.disks = this.disks.map(function (bits) {
                bits.human_size = Math.round(bits.human_size * 1000) / 1000;
                bits.human_used = Math.round(bits.human_used * 1000) / 1000;
                return bits;
            });
            this.disk_table.rows = this.disks;
        })
    }
});
