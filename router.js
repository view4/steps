const document = require("./helpers/document");
const writer = require ("./helpers/writer");
const router = {};
router.kadesh = {};
router.steps = {};

router.kadesh.get = (req, res) => {
    document.read("kadesh", "index", (data) => {
        let beliefs = (Object.keys(data));
        beliefs = JSON.stringify(beliefs)
        res.end(beliefs);
    })
};

router.steps.get = (req, res) => {
    const kadesh = req.belief;
    document.read("north", kadesh, (data) => {
        let steps = data;
        steps = JSON.stringify(steps);
        res.end(steps);
    })
};

router.steps.post = (req, res) => {
    let body = JSON.parse(req.body)
    const { steps } = body;
    writer.steps(steps)
    return res.end("there is great belief")
};


module.exports = router