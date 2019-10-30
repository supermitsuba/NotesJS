import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(
    private noteService: NoteService) { }

  ngOnInit() {
    this.note = new Note();
    this.note.comment = '';
    this.note.title = '';
  }

  receiveMessage(selectedCategory: Category) {
    this.note.category = selectedCategory;
  }

  public addNote() {

    if(!this.isValid()) {
      alert('Cannot create note, fix data!');
      return;
    }

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

  isValid(): boolean {
    const isTitleValid:boolean = this.note.title && this.note.title.trim() !== '';
    const isCategoryValid:boolean = !!this.note.category;

    return isCategoryValid && isTitleValid;
  }
}
