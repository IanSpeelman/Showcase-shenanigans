using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Showcase_Shenanigans_api.Data;
using System.Security.Claims;

namespace Showcase_Shenanigans_api.Controllers
{
  public class MovieController : Controller
  {

    public readonly AppDbContext _context;

    public MovieController(AppDbContext context)
    {
      _context = context;
    }

    [Authorize]
    [HttpPost("/movie/new")]
    public JsonResult NewMovie([FromBody] Movie Movie)
    {
      if (User.FindFirst(ClaimTypes.Role)?.Value == "admin")
      {
        Console.WriteLine($"=============================================={Movie.Description}");
        Movie newMovie = new()
        {
          Image = Movie.Image,
          Duration = Movie.Duration,
          Genre = Movie.Genre,
          Description = Movie.Description,
          Title = Movie.Title,
          Trailer = Movie.Trailer,
          Age = Movie.Age,
          Active = Movie.Active,
        };
        _context.Add(newMovie);
        _context.SaveChanges();
        Console.WriteLine("===============================you may now continue");
        return new JsonResult(new { msg = "success" });
      }
      return new JsonResult(new { msg = "logged in as a non admin" });
    }

    [HttpGet("movie/all")]
    public JsonResult AllMovies()
    {
      return new JsonResult(_context.Movies.ToList());
    }

    [HttpGet("movie/active")]
    public JsonResult ActiveMovies()
    {
      return new JsonResult(_context.Movies.Where(m => m.Active == true).ToList());
    }

    [HttpGet("movie/{id}")]
    public JsonResult AllMovies(int id)
    {
      return new JsonResult(_context.Movies.FirstOrDefault(m => m.Id == id));
    }







  }
}

