let database = require('../database');
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.roomId) {
        
        let bookingId = database.addBooking(roomId, req.body);
        context.log("Room reserved");
        
        //start saga
        let instanceId = "instanceid";

        //raise event
        context.outQueue = [instanceId];
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};