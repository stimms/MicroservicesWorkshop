const df = require("durable-functions");

module.exports = async function (context, instanceId) {
    context.log('Booking room with booking id {instanceId}', instanceId);

    const client = df.getClient(context);
    await client.raiseEvent(instanceId, "ROOM_BOOKED");
};