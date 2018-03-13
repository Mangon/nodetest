var http = require("http");
var url = require("url");

function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(pathname);

        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("Hello World");

        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
    // 输出当前目录
    console.log('当前目录: ' + process.cwd());

    // 输出当前版本
    console.log('当前版本: ' + process.version);

    // 输出内存使用情况
    console.log(process.memoryUsage());
}

exports.start = start;