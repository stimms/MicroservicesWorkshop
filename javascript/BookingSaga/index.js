
const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    // get booking id from context

   
    context.done();
});