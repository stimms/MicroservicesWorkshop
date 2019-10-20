module.exports = async function (context, bookingId) {
    context.log("Room {bookingId} submitted for charge", bookingId);
    if(Math.random() > 0.5){
        //TODO: add message to queue
    }
};