const server = require("./server");
const document = require("./helpers/document");
const writer = require("./helpers/writer");
const app = {};

app.init = () => {
    server.init();
};
app.init();

module.exports = app;