using Microsoft.AspNetCore.Mvc;
using Showcase_Shenanigans_api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;


namespace Showcase_Shenanigans_api.Controllers
{
  public class EventController : Controller
  {

    public readonly AppDbContext _context;
    public EventController(AppDbContext context)
    {
      _context = context;
    }

    [Authorize]
    [HttpPost("/event/new")]
    public IActionResult GetAllEvents([FromBody] RequestMovieEvent Event)
    {
      Movie Movie = _context.Movies.FirstOrDefault(Movie => Movie.Id == Event.MovieId)!;
      if (Movie != null)
      {
        MovieEvent NewEvent = new()
        {
          Movie = Movie,
          Date = Event.Date
        };
        _context.Add(NewEvent);
        _context.SaveChanges();
        return Ok();
      }
      return StatusCode(408, "something went wrong");
    }

    [HttpGet("/event/get/{id}")]
    public IActionResult GetEvent(int id)
    {
      MovieEvent Event = _context.MovieEvents.Include(m => m.Movie).FirstOrDefault(Event => Event.Id == id)!;
      if (Event != null)
      {
        return Ok(Event);
      }

      return StatusCode(404, "Event not found");
    }







  }
}
