using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using server.Models;

namespace server.Services 
{
    
    public class FileService : IDatabaseService
    {
        public const string saveLocation = "./data";
        public string noteSaveLocation = Path.Combine(saveLocation, "notes");
        public string categorySaveLocation = Path.Combine(saveLocation, "categories");
        public string userSaveLocation = Path.Combine(saveLocation, "users");

        public FileService()
        {
            if(!Directory.Exists(saveLocation)) {
                Directory.CreateDirectory(saveLocation);
            }

            if(!Directory.Exists(noteSaveLocation)) {
                Directory.CreateDirectory(noteSaveLocation);
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

        public List<Note> GetAllNotes()
        {
            return this.GetAllObjects<Note>(this.noteSaveLocation);
        }

        public List<Category> GetAllCategory()
        {
            return this.GetAllObjects<Category>(this.categorySaveLocation);
        }

        private T SaveObject<T>(T newObject, string path) where T : IDatabaseObject
        { 
            var data = JsonConvert.SerializeObject(newObject);
            var savePath = Path.Combine(path, $"{newObject.Id}.json");
            File.WriteAllText(savePath, data);
            return newObject;
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