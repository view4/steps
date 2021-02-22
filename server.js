const http = require("http");
const { StringDecoder } = require("string_decoder");
const url = require("url");

const router = require("./router");
const helpers = require("./helpers");

const headers ={
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000
};

const server = {};

server.httpServer = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method.toLowerCase();
    const {route, belief} = helpers.getRoute(pathname, method);
    if(!route) return;
    res.writeHead(200, headers)

    const decoder = new StringDecoder("utf-8");
    let buffer = "";

    req.on("data", (data) => {
        buffer+=decoder.write(data)
    })

    req.on("end", () => {
        buffer += decoder.end();
        route({belief, req, body:buffer}, res)
    });
})

server.init = () => {
    server.httpServer.listen(7000, () => {
        console.log("this server is listening")
    })
};

module.exports = server;