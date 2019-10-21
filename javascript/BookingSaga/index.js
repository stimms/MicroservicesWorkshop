/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    // get booking id from context

    const input = context.df.getInput();
    // wait for external event ROOM

    let roomBookedPromise = context.df.waitForExternalEvent("ROOM_BOOKED");
    // create a timer for 10 seconds

    let timeoutPromise = context.df.createTimer(new Date(context.df.currentUtcDateTime.setSeconds(context.df.currentUtcDateTime.getSeconds() + 10)));
    // either cancel reservation or upgrade reservation

    const winner = yield context.df.Task.any([roomBookedPromise, timeoutPromise]);
    if (winner == roomBookedPromise) {
        timeoutPromise.cancel();
    } else {
        context.bindings.timeoutroombooking = [input];
    }
    context.done();
});