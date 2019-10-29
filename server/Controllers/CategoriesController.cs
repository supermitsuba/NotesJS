namespace server.Controllers
{
    using System;
    using System.Linq;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;
    using server.Models;
    using server.Services;

    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IDatabaseService service;

        public CategoriesController(IDatabaseService service)
        {
            this.service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var categories = this.service.GetAllCategory().OrderByDescending(c => c.CreatedDate);
            return this.Ok(categories);
        }

        [HttpPost]
        public IActionResult Create(Category category)
        {
            var path = string.Format("{0}{1}", this.HttpContext.Request.Host, this.HttpContext.Request.Path);
            var savedCategory = this.service.SaveCategory(category);
            return this.Created(path, savedCategory);
        }
    }
}