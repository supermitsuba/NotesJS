import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { Category } from 'src/app/models/category';
import * as moment from 'moment';
import { SelectCategoryComponent } from 'src/app/categories/select-category/select-category.component';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss']
})
export class ViewNotesComponent implements OnInit {

  notes: Observable<Note[]>;
  cachedNotes: Observable<Note[]>;  

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.cachedNotes = this.noteService.getAllNotes();
    this.notes = this.cachedNotes;
  }

  receiveMessage(category: Category) {
    if(category.id === "All") {
      this.notes = this.cachedNotes;
    } else {
      this.notes = this.cachedNotes.pipe(
        map(notez => notez.filter(note => note.category && note.category.name === category.name))
      );
    }
  }

  onDelete(deletedNote: Note) {
    const n = deletedNote;
    if (confirm("Are you sure you want to delete?")) {
      this.noteService.deleteNotes(deletedNote)
        .subscribe(
          response => {
            this.notes = this.notes.pipe(
              map(notez => notez.filter(note => note.id !== n.id))
            );
            this.cachedNotes = this.cachedNotes.pipe(
              map(notez => notez.filter(note => note.id !== n.id))
            );
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
