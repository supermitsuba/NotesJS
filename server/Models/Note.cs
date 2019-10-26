namespace server.Models
{
    using System;
    
    public class Note: IDatabaseObject
    {
        public Guid Id {get;set;}
        public string Title {get;set;}
        public string Comment{get;set;} 
        public Category Category {get;set;} 
        public DateTime CreatedDate {get;set;} 
        public DateTime ModifiedDate{get;set;} 
        public User User {get;set;}
    }
}