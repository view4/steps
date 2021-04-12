const helpers = {};

helpers.parseBelief = (pathname) => {
  let belief = pathname
    .replace("/steps/", "")
    .replace(/%20/g, " ")
    .replace(/%27/g, "'");
  return belief;
};

helpers.getRoute = (pathname, method, router) => {
  let paths = pathname.split("/");
  if ((!router[paths[1]] || !router[paths[1]][method]) && !!paths[1]) return {};
  return { route: router[ !!paths[1] ? paths[1] : "client"][method], paths};
};

module.exports = helpers;
