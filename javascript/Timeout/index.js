let database = require('../database');
module.exports = async function (context, bookingId) {
    context.log("Timing out room booking {bookingId}", bookingId);
    database.cancelBooking(bookingId);
};