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
    } else if (pathname ==="/"){
        route= router.client.html;
    } else if (pathname.includes("/client")){
        let paths = pathname.split("/")
        let path = paths[paths.length-1]
        route = router.client[path]
    }

    return {route, belief }
};

module.exports = helpers;