var util = require('util');
var os = require("os");

// CPU 的字节序
console.log('endianness : ' + os.endianness());

// 默认临时文件夹
console.log('tmpdir : ' + os.tmpdir());

// 操作系统主机名
console.log('hostname : ' + os.hostname());

// 操作系统名
console.log('type : ' + os.type());

// 操作系统名
console.log('platform : ' + os.platform());

// 返回操作系统版本号
console.log('release : ' + os.release());

// 操作系统运行时间
console.log('uptime : ' + os.uptime());

// 平均负载数组
console.log('loadavg : ' + os.loadavg());

// 系统内存总量
console.log('total memory : ' + os.totalmem() + " bytes.");

// 操作系统空闲内存量
console.log('free memory : ' + os.freemem() + " bytes.");

// cpu信息
os.cpus().forEach(element => {
    console.log('cpu : ' + util.inspect(element));
});

// 网络接口列表
console.log('networkInterfaces : ' + util.inspect(os.networkInterfaces()));

