namespace server.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using server.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        [HttpGet]
        public void Get()
        {
            var category = new Category();
            var user = new User();
            var notes = new Note[]
            {
                new Note() { Id=1, Title="title1", Comment="Test1", Category=category, CreatedDate=DateTime.Now, ModifiedDate=DateTime.Now, User=user },
                new Note() { Id=2, Title="title2", Comment="Test2", Category=category, CreatedDate=DateTime.Now, ModifiedDate=DateTime.Now, User=user },
                new Note() { Id=3, Title="title3", Comment="Test3", Category=category, CreatedDate=DateTime.Now, ModifiedDate=DateTime.Now, User=user },
            };

            this.Ok(notes);
        }

        [HttpPost]
        public void Create(Note note)
        {
            this.Ok(note);
        }
    }
}