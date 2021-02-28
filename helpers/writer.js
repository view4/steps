const document = require("./document");
const writer = {};

writer.steps = async (steps) => {
    const { kadesh } = steps;
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

writer.alterBeliefText("Do not murde", "Do not murder")

const steps = {
    kadesh:  "Love the Lord, your God, with all your heart and with all your soul, and with all your might",//"hear O'Israel; the Lord is your God, the Lord is One",
    urchatz: "There is an importance of cleansing and remaining cleansed with some meaning in being.",
    karpas: ["To feel love", "To associate with the commandments", "Song of songs relates to the relationship between the Jewish people and God as the bride and groom" ],
    yachatz: ["To internalise a lot of this", "Therefore there is such a thing as being unified"]
}


module.exports = writer;