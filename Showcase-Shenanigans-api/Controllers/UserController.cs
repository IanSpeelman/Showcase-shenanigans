using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Showcase_Shenanigans_api.Data;
using Showcase_Shenanigans_api.Services;

namespace Showcase_Shenanigans_api.Controllers
{
  [ApiController]
  public class UserController : Controller
  {

    private readonly JwtTokenGenerator _jwtTokenGenerator;

    private readonly AppDbContext _context;

    private readonly PasswordHasher<object> _passwordHasher;

    public UserController(AppDbContext context, IConfiguration configuration)
    {
      this._context = context;
      this._passwordHasher = new PasswordHasher<object>();
      _jwtTokenGenerator = new JwtTokenGenerator(configuration);
    }

    // Example action method
    [HttpPost("Register")]
    public IActionResult Register([FromBody] User User)
    {
      User newUser = new()
      {
        Email = User.Email,
        Password = _passwordHasher.HashPassword(null, User.Password),
        Role = "user",
        FirstName = User.FirstName,
        LastName = User.LastName
      };
      if (newUser != null)
      {
        _context.Users.Add(newUser);
        _context.SaveChanges();
        var token = _jwtTokenGenerator.GenerateToken(newUser);
        return Ok(new { Token = token });
      }

      var validator = new Validator(newUser.Password, "meisster");
      return new JsonResult(new { msg = "success", status = 200, validationSuccess = validator.validate() });
    }



    [HttpPost("Login")]
    public IActionResult Login([FromBody] User User)
    {
      User CurrentUser = _context.Users.FirstOrDefault(u => u.Email == User.Email);
      Console.WriteLine(CurrentUser);
      if (CurrentUser != null)
      {
        var validator = new Validator(CurrentUser.Password, User.Password);
        if (validator.validate())
        {
          var token = _jwtTokenGenerator.GenerateToken(CurrentUser);
          return Ok(new { Token = token });

        }
      }
      return Unauthorized(new { message = "Could not authenticate!" });
    }
  }
}

