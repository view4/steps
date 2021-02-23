const server = require("./server");
const app = {};

app.init = () => {
    server.init();
};
app.init();

module.exports = app;