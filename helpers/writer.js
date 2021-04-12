const document = require("./document");
const writer = {};

writer.steps = async (steps) => {
    let { kadesh } = steps;
    kadesh = kadesh.trim();
    let res = await document.ammend("kadesh", "index", {[kadesh]: {}});
    res = await document.write("north",kadesh, steps)
}

writer.read = (kadesh) => {
    const callback = (data) => {
        //  Can do something with the data here.
    }
    const res = document.read("north", kadesh, callback);
}

writer.alterBeliefText = (originalText, correctedText) => {
    document.ammend("kadesh", "index", {[correctedText]: {}}, originalText);
    document.rename(`north/${originalText}.json`,`north/${correctedText}.json` )
    document.ammend("north", correctedText, {kadesh: correctedText})
}

writer.getBackup = async () => {
    const beliefs = await document.readSync("kadesh", "index");
    Object.keys(beliefs).map(async(belief) => {
        beliefs[belief] = await document.readSync("north", belief);
    })
    return beliefs
}


module.exports = writer;