import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  public addNote(newNote: Note): Observable<Note> {
    return of(newNote);
  }

  public getAllNotes():Observable<Note[]> {
    let category = { id: 1, name:'a', createdDate: new Date(), modifiedDate: new Date(), user: null };
    let notes = [
      { id:1, title:'title1', comment:'test1', category:category, createdDate: new Date, modifiedDate: new Date(), user:null },
      { id:1, title:'title2', comment:'test2', category:category, createdDate: new Date, modifiedDate: new Date(), user:null },
      { id:1, title:'title3', comment:'test3', category:category, createdDate: new Date, modifiedDate: new Date(), user:null }
    ]
    return of(notes);
  }
}
