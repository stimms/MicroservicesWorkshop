var rooms = [
    {
        id: "b3eeac1f-a473-41b3-a648-e4dba0b2d96e",
        name:"Garden view",
        bookings: []
    },
    {
        id: "aabbe1f-a473-41b3-a648-e4dba0b2d96e",
        name: "Sea View",
        bookings: []
    },
    {
        id: "128bec1f-a473-41b3-a648-e4dba0b2d96e",
        name: "Broom closet",
        bookings: []
    }
];

function addBooking(roomId, booking){
    rooms.find(x=>x.id == roomId).bookings.push(booking);
    return "a booking id";
};

function cancelBooking(bookingId){
    let room = rooms.find(x=>x.bookings.find(bookingId).length > 0);
    room.bookings = room.bookings.filter(x=>x.id !== bookingId);
}

function findEmptyRooms(startDate, endDate){
    return rooms.filter(x=>(x.bookings.filter(y=> 
        (endDate >= y.startDate && endDate < y.endDate) || 
        (startDate >= y.StartDate && startDate <= y.EndDate)).length === 0));
}

module.exports = { rooms, addBooking, cancelBooking, findEmptyRooms};