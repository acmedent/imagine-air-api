// local imports
const email = require("./email/send");

const routes = [
    email.route,
]

// export routes
module.exports = routes;
