using Microsoft.AspNetCore.Mvc;
using Showcase_Shenanigans_api.Data;


namespace Showcase_Shenanigans_api.Controllers
{
  public class EventController : Controller
  {

    public readonly AppDbContext _context;
    public EventController(AppDbContext context)
    {
      _context = context;
    }
  }
}
