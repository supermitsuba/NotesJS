import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-new-notes',
  templateUrl: './new-notes.component.html',
  styleUrls: ['./new-notes.component.scss']
})
export class NewNotesComponent implements OnInit {

  public note: Note;
  public categories: Category[];

  constructor(
    private categoryService: CategoryService, 
    private noteService: NoteService) { }

  ngOnInit() {
    this.note = new Note();
    this.note.comment = '';
    this.note.title = '';
    this.getAllCategories();
  }

  public addNote() {
    this.noteService.addNote(this.note)
        .subscribe(
          n => {
            alert('Saved ');
            this.note.comment = '';
            this.note.title = '';
          }, 
          error => {
            alert('Could not save note.');
            console.log(error);
          });
  }

  public getAllCategories() {
    this.categoryService.getAllCategories()
        .subscribe( c => {
          this.categories = c
        });
  }
}
