namespace server.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using server.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var categories = new Category[]{
                new Category() { Id= 1, Name="a", CreatedDate= new DateTime(), ModifiedDate= new DateTime(), User= new User() },
                new Category() { Id= 1, Name="b", CreatedDate= new DateTime(), ModifiedDate= new DateTime(), User= new User() },
                new Category() { Id= 1, Name="c", CreatedDate= new DateTime(), ModifiedDate= new DateTime(), User= new User() },
            };

            return this.Ok(categories);
        }

        [HttpPost]
        public IActionResult Create(Category note)
        {
            var path = string.Format("{0}{1}", this.HttpContext.Request.Host, this.HttpContext.Request.Path);
            return this.Created(path, note);
        }
    }
}