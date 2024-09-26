namespace Showcase_Shenanigans_api.Data
{
    public class BookingRequest
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public int UserId { get; set; }
        public int Amount { get; set; }
    }
}
