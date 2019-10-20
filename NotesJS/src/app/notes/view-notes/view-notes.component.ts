import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss']
})
export class ViewNotesComponent implements OnInit {

  notes: Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getAllNotes()
        .subscribe(n => this.notes = n)
  }

}
