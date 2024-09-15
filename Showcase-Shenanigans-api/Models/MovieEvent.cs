namespace Showcase_Shenanigans_api.Data
{
  public class MovieEvent
  {
    public int id { get; set; }
    public DateTime Date { get; set; }
    public Movie Movie { get; set; } = null!;
  }
}
