const { readFile, createWriteStream } = require("fs");
const { parseBelief } = require("./helpers");
const document = require("./helpers/document");
const writer = require("./helpers/writer");
const router = {};
router.kadesh = {};
router.steps = {};
router.client = {};
router.backup = {};
router.upload = {};

router.kadesh.get = (req, res) => {
  document.read("kadesh", "index", (data) => {
    let beliefs = Object.keys(data);
    beliefs = JSON.stringify(beliefs);
    res.end(beliefs);
  });
};

router.kadesh.patch = (req, res) => {
  const body = JSON.parse(req.body);
  const { correctedText, originalText } = body;
  writer.alterBeliefText(originalText, correctedText);
};

router.steps.get = (req, res) => {
  const { paths } = req;
  const belief = paths[paths.length - 1];
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
  const { paths } = req;
  const type = paths[paths.length - 1] || "html";

  router.client[type] && router.client[type](req, res);
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

router.backup.get = async (req, res) => {
  let beliefs = await writer.getBackup();
  beliefs = JSON.stringify(beliefs);
  // const date = new Date();
  // const path = `./data/backups/${date.toDateString()}.json`  
  // await document.create("backups", date.toDateString(), beliefs, ()=> {
  //   console.log("calling callback")
  //   const stream =createWriteStream(path)
  //   res.pipe(stream)
  //   res.on("end", () => {
  //     console.log("download done")
  //   })
  // });

  res.end(beliefs);
};

router.upload.post = async (req, res) => {
  try {
    let beliefs = JSON.parse(req.body);
    writer.upload(beliefs)
    res.end("Uploaded");
  } catch (e) {
    console.log(error)
    res.end("error: ", e);
  }
};

module.exports = router;
