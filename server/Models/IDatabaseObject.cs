using System;

namespace server.Models
{
    public interface IDatabaseObject
    {
         Guid Id {get;set;}
         DateTime ModifiedDate { get; set; }
    }
}