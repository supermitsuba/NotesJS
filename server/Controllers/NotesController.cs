namespace server.Controllers
{
    using System;
    using Microsoft.AspNetCore.Cors;
    using Microsoft.AspNetCore.Mvc;
    using server.Models;
    using server.Services;

    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly IDatabaseService service;

        public NotesController(IDatabaseService service)
        {
            this.service = service;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var notes = this.service.GetAllNotes();
            return this.Ok(notes);
        }

        [HttpPost]
        public IActionResult Create(Note note)
        {
            var path = string.Format("{0}{1}", this.HttpContext.Request.Host, this.HttpContext.Request.Path);
            var savedNote = this.service.SaveNote(note);
            return this.Created(path, savedNote);
        }
    }
}