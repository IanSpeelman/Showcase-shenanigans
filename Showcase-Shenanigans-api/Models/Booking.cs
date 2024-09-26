namespace Showcase_Shenanigans_api.Data
{
    public class Booking
    {
        public int Id { get; set; }
        public MovieEvent Event { get; set; } = null!;
        public User User { get; set; } = null!;
        public int Amount { get; set; }
    }
}
