let database = require('../database');
const df = require("durable-functions");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.roomId) {
        
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a roomId on the query string"
        };
    }
};