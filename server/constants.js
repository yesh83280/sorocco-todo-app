const CONSTANTS = {};
CONSTANTS.ENDPOINT = {};

CONSTANTS.PORT = process.env.PORT || "3000";
CONSTANTS.ENDPOINT.TODO = "/todo";

CONSTANTS.ENDPOINT.TODOID = "/todo/:todoid";

module.exports = CONSTANTS;
