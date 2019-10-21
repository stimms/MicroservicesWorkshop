module.exports = async function (context, bookingId) {
    context.log("Room {bookingId} submitted for charge", bookingId);
    //50% chance that we'll manage to charge
    if(Math.random() > 0.5){
        //add message to queue
        
    }
};