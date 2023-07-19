const http = require('http');

const server = http.createServer((request, response) => {
    if (request.url === "/") {
        response.write("Home\n");
    } else if (request.url === "/about") {
        response.write("About page\n");
    } else {
        response.write("Error 404 page not found\n");
    }
    response.end("response ended")
});

server.listen(3333);