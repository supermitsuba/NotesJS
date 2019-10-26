using System;

namespace server.Models
{
    public class Category
    {
        public int Id { get; internal set; }
        public string Name { get; internal set; }
        public User User { get; internal set; }
        public DateTime ModifiedDate { get; internal set; }
        public DateTime CreatedDate { get; internal set; }
    }
}