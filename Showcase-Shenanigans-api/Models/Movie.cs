namespace Showcase_Shenanigans_api.Data
{
  public class Movie
  {
    public int Id { get; set; }
    public string Image { get; set; } = null!;
    public int Duration { get; set; }
    public string Genre { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Trailer { get; set; } = null!;
    public int Age { get; set; }


  }
}
