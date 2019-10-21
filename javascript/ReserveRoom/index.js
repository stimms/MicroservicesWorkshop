let database = require('../database');
const df = require("durable-functions");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.roomId) {
        const roomId = req.query.roomId;
        let bookingId = database.addBooking(roomId, req.body);
        context.log("Room reserved");
        
        //start saga
        const client = df.getClient(context);
        const instanceId = await client.startNew("BookingSaga", undefined, bookingId);
    
        //raise event
        context.bindings.roomreserved = [instanceId];
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a roomId on the query string"
        };
    }
};