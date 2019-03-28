const http = require('http');

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader("content-type","text/plain");
    res.end("Hello I am mukesh kumar");
});
server.listen(port,hostname,() => {
    console.log("Server started on port",port);
});