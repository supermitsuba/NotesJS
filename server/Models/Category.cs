using System;

namespace server.Models
{
    public class Category : IDatabaseObject
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public User User { get; set; }
        public DateTime ModifiedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}