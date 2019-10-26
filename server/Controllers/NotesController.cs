namespace server.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using server.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var category = new Category();
            var user = new User();
            var notes = new Note[]
            {
                new Note() { Id=1, Title="title1", Comment="Test1", Category=category, CreatedDate=DateTime.Now, ModifiedDate=DateTime.Now, User=user },
                new Note() { Id=2, Title="title2", Comment="Test2", Category=category, CreatedDate=DateTime.Now, ModifiedDate=DateTime.Now, User=user },
                new Note() { Id=3, Title="title3", Comment="Test3", Category=category, CreatedDate=DateTime.Now, ModifiedDate=DateTime.Now, User=user },
            };

            return this.Ok(notes);
        }

        [HttpPost]
        public IActionResult Create(Note note)
        {
            var path = string.Format("{0}{1}", this.HttpContext.Request.Host, this.HttpContext.Request.Path);
            return this.Created(path, note);
        }
    }
}