const { readFile } = require("fs");
const { parseBelief } = require("./helpers");
const document = require("./helpers/document");
const writer = require("./helpers/writer");
const router = {};
router.kadesh = {};
router.steps = {};
router.client = {};

router.kadesh.get = (req, res) => {
  document.read("kadesh", "index", (data) => {
    let beliefs = Object.keys(data);
    beliefs = JSON.stringify(beliefs);
    res.end(beliefs);
  });
};

router.steps.get = (req, res) => {
  const { paths } = req;
  const belief =paths[paths.length - 1];
  const kadesh = parseBelief(belief);
  document.read("north", kadesh, (data) => {
    let steps = data;
    steps = JSON.stringify(steps);
    res.end(steps);
  });
};

router.steps.post = (req, res) => {
  let body = JSON.parse(req.body);
  const { steps } = body;
  writer.steps(steps);
  return res.end("there is great belief");
};

router.client.html = (req, res) => {
  const mimeType = "text/html";
  const filePath = "./client/steps.html";
  readFile(filePath, (err, content) => {
    if (!err) {
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(content, "utf-8");
    }
  });
};

router.client.get = (req, res) => {
    // try{
        const { paths } = req;
        const type = paths[paths.length - 1] || "html";
        
        router.client[type] && router.client[type](req, res);
    // } catch{}

};

router.client.css = (req, res) => {
  const mimeType = "text/css";
  const filePath = "./client/css/steps.css";
  readFile(filePath, (err, content) => {
    if (!err) {
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(content, "utf-8");
    }
  });
};

router.client.faith = (req, res) => {
  const mimeType = "text/javascript";
  const filePath = "./client/js/hope_and_faith.js";
  readFile(filePath, (err, content) => {
    if (!err) {
      res.writeHead(200, { "Content-Type": mimeType });
      res.end(content, "utf-8");
    }
  });
};

module.exports = router;
