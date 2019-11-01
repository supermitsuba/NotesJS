using System;

namespace server.Models
{
    public class User: IDatabaseObject
    {
        public Guid Id {get;set;}
        public string Name {get;set;}
        public DateTime CreatedDate {get;set;} 
        public DateTime ModifiedDate{get;set;} 
    }
}