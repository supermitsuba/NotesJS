import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-notes',
  templateUrl: './new-notes.component.html',
  styleUrls: ['./new-notes.component.scss']
})
export class NewNotesComponent implements OnInit {

  public note: Note;

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.note = new Note();
    this.note.comment = '';
    this.note.title = '';

    if (id) {
      this.noteService.getNoteById(id).subscribe(n => {
        this.note = n;
      }, err => {
        alert('Invalid id!');
        this.location.back();
      });
    }
  }

  receiveMessage(selectedCategory: Category) {
    this.note.category = selectedCategory;
  }

  public addNote() {

    if(!this.isValid()) {
      alert('Cannot create note, fix data!');
      return;
    }

    if(!this.note.id) {
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
      return;
    } else {
      this.note.modifiedDate = new Date();
      this.noteService.updateNote(this.note)
          .subscribe(
            n => {
              alert('Updated!');
              this.location.back();
            }, 
            error => {
              alert('Could not save note.');
              console.log(error);
            });
    }
  }

  isValid(): boolean {
    const isTitleValid:boolean = this.note.title && this.note.title.trim() !== '';
    const isCategoryValid:boolean = !!this.note.category;

    return isCategoryValid && isTitleValid;
  }
}
