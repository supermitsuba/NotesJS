namespace server.Controllers
{
    using System;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using server.Models;
    using server.Services;

    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly IDatabaseService service;

        public NotesController(IDatabaseService service)
        {
            this.service = service;
        }

        [HttpGet]
        [Route("api/notes")]
        public IActionResult Get()
        {
            var notes = this.service.GetAllNotes().OrderByDescending(n => n.ModifiedDate);
            return this.Ok(notes);
        }

        [HttpPost]
        [Route("api/notes")]
        public IActionResult Create(Note note)
        {
            var path = string.Format("{0}{1}", this.HttpContext.Request.Host, this.HttpContext.Request.Path);
            var savedNote = this.service.SaveNote(note);
            return this.Created(path, savedNote);
        }

        [HttpDelete]
        [Route("api/notes/{id:Guid}")]
        public IActionResult Delete(Guid id) {
            this.service.DeleteNote(id);
            return this.Ok();
        }
    }
}