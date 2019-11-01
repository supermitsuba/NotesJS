namespace server.Services 
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using Newtonsoft.Json;
    using server.Models;
    using server.Exception;

    public class FileService : IDatabaseService
    {
        public const string saveLocation = "./data";
        public readonly string noteSaveLocation = Path.Combine(saveLocation, "notes");
        public readonly string noteNotActiveLocation = "";
        public string categorySaveLocation = Path.Combine(saveLocation, "categories");
        public string userSaveLocation = Path.Combine(saveLocation, "users");

        public FileService()
        {
            this.noteNotActiveLocation = Path.Combine(noteSaveLocation, "empty");

            if(!Directory.Exists(saveLocation)) {
                Directory.CreateDirectory(saveLocation);
            }

            if(!Directory.Exists(noteSaveLocation)) {
                Directory.CreateDirectory(noteSaveLocation);
            }

            if(!Directory.Exists(noteNotActiveLocation)) {
                Directory.CreateDirectory(noteNotActiveLocation);
            }

            if(!Directory.Exists(categorySaveLocation)) {
                Directory.CreateDirectory(categorySaveLocation);
            }

            if(!Directory.Exists(userSaveLocation)) {
                Directory.CreateDirectory(userSaveLocation);
            }
        }

        public Note SaveNote(Note newNote) 
        {
            newNote.Id = Guid.NewGuid();
            newNote.CreatedDate = DateTime.Now;
            newNote.ModifiedDate = DateTime.Now;
            newNote.User = this.GetUser();

            return this.SaveObject(newNote, this.noteSaveLocation);
        }

        public Category SaveCategory(Category newCategory) 
        {
            newCategory.Id = Guid.NewGuid();
            newCategory.CreatedDate = DateTime.Now;
            newCategory.ModifiedDate = DateTime.Now;
            newCategory.User = this.GetUser();
            
            return this.SaveObject(newCategory, this.categorySaveLocation);
        }

        public Note UpdateNote(Note updateNote) {
            return this.UpdateObject<Note>(updateNote, this.noteSaveLocation);
        }

        public List<Note> GetAllNotes()
        {
            return this.GetAllObjects<Note>(this.noteSaveLocation);
        }

        public List<Category> GetAllCategory()
        {
            return this.GetAllObjects<Category>(this.categorySaveLocation);
        }

        public void DeleteNote(Guid id) {
            var path1 = Path.Combine(this.noteSaveLocation, $"{id}.json");
            var path2 = Path.Combine(this.noteNotActiveLocation, $"{id}.json");
            File.Move(path1, path2);
        }

        private T SaveObject<T>(T newObject, string path) where T : IDatabaseObject
        { 
            var data = JsonConvert.SerializeObject(newObject);
            var savePath = Path.Combine(path, $"{newObject.Id}.json");
            File.WriteAllText(savePath, data);
            return newObject;
        }

        private T UpdateObject<T>(T updateObject, string saveLocation) where T : IDatabaseObject
        { 
            var path = Path.Combine(saveLocation, $"{updateObject.Id}.json");
            if (!File.Exists(path))
            {
                throw new NotFoundException();
            }

            var oldObject = JsonConvert.DeserializeObject<T>(File.ReadAllText(path));
            if(oldObject.ModifiedDate < updateObject.ModifiedDate)
            {
                var data = JsonConvert.SerializeObject(updateObject);
                File.WriteAllText(path, data);
            }
            else 
            {
                updateObject = oldObject;
                throw new ConflictException();
            }

            return updateObject;
        }

        private List<T> GetAllObjects<T>(string path)
        {
            var list = new List<T>();
            var allFiles = Directory.GetFiles(path, "*.json", SearchOption.TopDirectoryOnly);
            foreach(var file in allFiles) {
                var stringData = File.ReadAllText(file);
                var data = JsonConvert.DeserializeObject<T>(stringData);
                list.Add(data);
            }

            return list;
        }

        private User GetUser() {
            return new User()
            {
                Id = new Guid("98013ff5-fdfc-412d-a0da-a8a53cd44776"),
                Name = "Jorden"
            };
        }
    }
}