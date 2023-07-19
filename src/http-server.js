const http = require('http');

const server = http.createServer((request, response) => {
    if (request.url === "/") {
        response.write("test\n");
    }
    response.end("response ended")
});

server.listen(3333);