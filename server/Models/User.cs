using System;

namespace server.Models
{
    public class User: IDatabaseObject
    {
        public Guid Id {get;set;}
        public string Name {get;set;}
    }
}