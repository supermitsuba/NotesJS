import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { SelectCategoryComponent } from 'src/app/categories/select-category/select-category.component';
import { Category } from 'src/app/models/category';

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
}
