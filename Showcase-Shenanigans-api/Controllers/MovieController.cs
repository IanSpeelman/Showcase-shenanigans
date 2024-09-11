using Microsoft.AspNetCore.Mvc;
using Showcase_Shenanigans_api.Data;

namespace Showcase_Shenanigans_api.Controllers
{
  public class MovieController : Controller
  {
    // Example action method
    [HttpPost]
    public JsonResult Index([FromBody] User User)
    {

      return new JsonResult(new { msg = "hello" });
    }
  }
}

