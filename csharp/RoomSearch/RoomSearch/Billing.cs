using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace RoomSearch
{
    public static class Billing
    {

        private static Random _random = new Random();
        [FunctionName("Billing")]
        public static void Run([QueueTrigger("RoomReserved")]string bookingId, 
            [Queue("PaymentReceived")]ICollector<string> messages,
            ILogger log)
        {
            log.LogInformation("Room {bookingId} submitted for charge", bookingId);
            //50% chance we'll send a message
            if(_random.NextDouble() > .5)
            {
                //add a message to the queue
            }

        }
    }
}
