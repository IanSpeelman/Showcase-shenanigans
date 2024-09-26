using Microsoft.AspNetCore.Mvc;
using Showcase_Shenanigans_api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


namespace Showcase_Shenanigans_api.Controllers
{
    public class BookingController : Controller
    {

        public readonly AppDbContext _context;
        public BookingController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost("/booking/new")]
        public IActionResult newBooking([FromBody] BookingRequest BookingRequest)
        {
            User User = _context.Users.FirstOrDefault(user => user.Id == BookingRequest.UserId)!;
            MovieEvent Event = _context.MovieEvents.FirstOrDefault(Event => Event.Id == BookingRequest.EventId)!;

            if (User != null && Event != null)
            {
                Booking newBooking = new()
                {
                    Event = Event,
                    User = User,
                    Amount = BookingRequest.Amount,

                };

                _context.Add(newBooking);
                _context.SaveChanges();
                return Ok();
            }
            return StatusCode(404);
        }

        [Authorize]
        [HttpGet("booking/{id}")]
        public IActionResult GetMyBookings(int id)
        {
            List<Booking> Bookings = _context.Bookings.
                Where(booking => booking.User.Id == id)
                .Include(booking => booking.Event)
                .ThenInclude(Event => Event.Movie)
                .OrderBy(booking => booking.Event.Date)
                .ToList()!;

            if (Bookings != null)
            {
                return Ok(Bookings);
            }



            return StatusCode(404);
        }





    }
}
