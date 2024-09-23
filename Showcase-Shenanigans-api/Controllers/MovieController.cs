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
        public IActionResult NewMovie([FromBody] Movie Movie)
        {
            if (User.FindFirst(ClaimTypes.Role)?.Value == "admin")
            {
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
                    Thumbnail = Movie.Thumbnail,
                };
                _context.Add(newMovie);
                _context.SaveChanges();
                return Ok(new { id = newMovie.Id });
            }
            return StatusCode(304, "something went wrong");
        }

        [HttpGet("movie/all")]
        public IActionResult AllMovies()
        {
            List<Movie> Movies = _context.Movies.ToList();
            if (Movies != null)
            {
                return Ok(Movies);
            }
            return StatusCode(404, "Oops something weng wrong!");
        }

        [HttpGet("movie/active")]
        public IActionResult ActiveMovies()
        {
            List<Movie> Movies = _context.Movies.Where(m => m.Active == true).ToList();
            if (Movies != null)
            {
                return Ok(Movies);
            }
            return StatusCode(404, "Oops something went wrong!");
        }

        [HttpGet("movie/{id}")]
        public IActionResult SingleMovie(int id)
        {
            Movie Movie = _context.Movies.FirstOrDefault(m => m.Id == id)!;
            if (Movie != null)
            {
                return Ok(Movie);
            }
            return StatusCode(404, "Oops something went wrong");


        }


        [Authorize]
        [HttpPut("movie/edit/{id}")]
        public IActionResult EditMovie([FromBody] Movie Movie, int id)
        {
            Movie EditMovie = _context.Movies.FirstOrDefault(m => m.Id == id)!;
            if (Movie != null && EditMovie != null)
            {
                EditMovie.Image = Movie.Image;
                EditMovie.Duration = Movie.Duration;
                EditMovie.Genre = Movie.Genre;
                EditMovie.Description = Movie.Description;
                EditMovie.Title = Movie.Title;
                EditMovie.Trailer = Movie.Trailer;
                EditMovie.Age = Movie.Age;
                EditMovie.Active = Movie.Active;
                EditMovie.Thumbnail = Movie.Thumbnail;
                _context.Update(EditMovie);
                _context.SaveChanges();
                return Ok(new { id = id });
            }
            return StatusCode(304, "Oops something went wrong");
        }







    }
}

