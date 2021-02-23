const helpers = {};

helpers.parseBelief = (pathname) => {
    let belief = pathname.replace("/steps/", "").replace(/%20/g, " ").replace(/%27/g, "'");
    return belief
}

module.exports = helpers;