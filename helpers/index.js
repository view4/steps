const router = require("../router")

const helpers = {};

helpers.parseBelief = (pathname) => {
    let belief = pathname.replace("/steps/", "").replace(/%20/g, " ").replace(/%27/g, "'");
    return belief
}

helpers.getRoute = (pathname, method) => {
    let route;
    let belief; 
    if(pathname.includes("/kadesh")){
        route = router.kadesh[method];
    } else if (pathname.includes("/steps")){
        route = router.steps[method];
        belief = helpers.parseBelief(pathname)
    }

    return {route, belief }
};

module.exports = helpers;