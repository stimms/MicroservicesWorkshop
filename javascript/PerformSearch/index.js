let database = require('../database')
module.exports = async function (context, req) {
    context.log('Got rooom search request.');

    if (req.query.startDate && req.query.endDate) {
        let {startDate, endDate} = req.query;
        context.log("Searching for room booking in range {startDate} to {endDate}.", startDate, endDate);
        context.res = {
            status: 200,
            body: database.findEmptyRooms(startDate, endDate)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};