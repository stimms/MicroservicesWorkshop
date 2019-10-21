using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading;

namespace RoomSearch
{
    public static class RoomAvailability
    {
        [FunctionName("PerformSearch")]
        public static IActionResult PerformSearch(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "room")] HttpRequest req,
            ILogger log)
        {

            var startDate = DateTime.Parse(req.Query["startDate"]);
            var endDate = DateTime.Parse(req.Query["endDate"]);
            log.LogInformation("Searching for room booking in range {startDate} to {endDate}.", startDate, endDate);
            return new JsonResult(Database.FindEmptyRoom(startDate, endDate));

        }

        [FunctionName("ReserveRoom")]
        public static async Task<IActionResult> ReserveRoom([HttpTrigger(AuthorizationLevel.Function, "post", Route = "room/{roomId}")]
            Booking booking,
            string roomId,
            [OrchestrationClient]DurableOrchestrationClient starter,
            [Queue("RoomReserved")]ICollector<string> billingMessages,
            ILogger log)
        {
            var bookingId = Database.AddBooking(roomId, booking);
            log.LogInformation("Room reserved");

            return new OkResult();
        }

        [FunctionName("BookingSaga")]
        public static async Task BookingSaga([OrchestrationTrigger] DurableOrchestrationContext context,
            [Queue("TimeoutRoomBooking")]ICollector<string> billingMessages,
            ILogger log)
        {
            var bookingId = context.GetInput<string>();
            using (var cancellationSource = new CancellationTokenSource())
            {

            }
        }



        [FunctionName("BookRoom")]
        public static async Task BookRoom([QueueTrigger("PaymentReceived")]string instanceId, [OrchestrationClient]DurableOrchestrationClient starter,
            ILogger log)
        {
            //cancel timeout
            log.LogInformation("Booking room with booking id {bookingId}", instanceId);
        }

        [FunctionName("Timeout")]
        public static void Timeout([QueueTrigger("TimeoutRoomBooking")]string bookingId,
            ILogger log)
        {
            log.LogInformation("Timing out room booking {bookingId}", bookingId);
        }
    }
}

