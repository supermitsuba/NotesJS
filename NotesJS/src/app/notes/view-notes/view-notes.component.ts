import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { Category } from 'src/app/models/category';
import * as moment from 'moment';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss']
})
export class ViewNotesComponent implements OnInit {

  notes: Note[];
  cachedNotes: Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getAllNotes()
        .subscribe(n => { this.notes = n; this.cachedNotes = n })
  }

  receiveMessage(selectedCategory: Category) {
    this.notes = this.cachedNotes.filter( note => note && note.category && note.category.name === selectedCategory.name);
  }

  onDelete(deletedNote: Note) {
    const n = deletedNote;
    if (confirm("Are you sure you want to delete?")) {
      this.noteService.deleteNotes(deletedNote)
        .subscribe(
          response => {
            this.notes = this.notes.filter(note => note.id !== n.id);
            this.cachedNotes = this.cachedNotes.filter(note => note.id !== n.id);
          }, 
          error => {
            alert('Could not delete note.');
            console.log(error);
          });
        }
  }

  displayLastUpdated(note: Note): string {
    return moment(note.modifiedDate).fromNow();
  }

  getDateTime(): string {
    return moment().format("MMMM Do YYYY, h:mm a");
  }
}
