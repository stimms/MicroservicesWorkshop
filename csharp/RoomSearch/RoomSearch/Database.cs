using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RoomSearch
{
    class Database
    {

        private static IEnumerable<Room> _rooms = new List<Room>
        {
            new Room{ Name = "Garden suite"},
            new Room{ Name = "Sea view"},
            new Room{ Name = "Broom closet"},
        };

        public static IEnumerable<Room> FindEmptyRoom(DateTime startDate, DateTime endDate)
        {
            return _rooms.Where(x => !x.Bookings.Any(y => (
                  (endDate >= y.StartDate && endDate <= y.EndDate) ||
                  (startDate >= y.StartDate && startDate <= y.EndDate))
                )).Select(x => new Room { Id = x.Id, Name = x.Name });
        }

        public static string AddBooking(string roomId, Booking booking)
        {
            _rooms.First(x => x.Id == roomId).Bookings.Add(booking);
            return booking.Id;
        }

        public static void CancelBooking(string bookingId)
        {
            var room = _rooms.FirstOrDefault(x => x.Bookings.Any(y => y.Id == bookingId));
            if (room != null)
                room.Bookings = room.Bookings.Where(x => x.Id != bookingId).ToList();
        }
    }

    public class Room
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public List<Booking> Bookings { get; set; } = new List<Booking>();

    }

    public class Booking
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string CustomerId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
