namespace server.Services
{
    using System;
    using System.Collections.Generic;
    using server.Models;
    public interface IDatabaseService
    {
        Note SaveNote(Note newNote);
        Category SaveCategory(Category newCategory);

        Note UpdateNote(Note updateNote);

        List<Note> GetAllNotes();
        List<Category> GetAllCategory();
        void DeleteNote(Guid id);
    }
}