namespace server.Services
{
    using System.Collections.Generic;
    using server.Models;
    public interface IDatabaseService
    {
        Note SaveNote(Note newNote);
        Category SaveCategory(Category newCategory);
        List<Note> GetAllNotes();
        List<Category> GetAllCategory();
    }
}