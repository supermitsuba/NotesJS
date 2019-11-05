import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Note } from '../models/note';
import { Observable } from 'rxjs';
import { NoteService } from './note.service';
import { tap } from 'rxjs/operators';
import { LocalStorageKey } from '../models/localStorageKey';

@Injectable({
  providedIn: 'root'
})
export class CacheNotesService {

  constructor(private localStorageService: LocalStorageService,
    private noteService: NoteService) { }

  public addNote(newNote: Note): Observable<Note> {
    return this.noteService.addNote(newNote)              
              .pipe(tap(p => {
                if(this.localStorageService.hasKey(LocalStorageKey.getAllNotes)) {
                  let data = this.localStorageService.getKey<Note[]>(LocalStorageKey.getAllNotes);
                  data.filter(d => d.id == p.id);
                  data.push(p);
                } else {
                  this.localStorageService.set(LocalStorageKey.getAllNotes, [p]);
                }
              }));
  }

  public getAllNotes():Observable<Note[]> {
    return this.noteService.getAllNotes()
              .pipe(tap(p => this.localStorageService.set(LocalStorageKey.getAllNotes, p)));
  }

  public getNoteById(id: string): Observable<Note> {
    return this.noteService.getNoteById(id)
              .pipe(tap(p => {
                if(this.localStorageService.hasKey(LocalStorageKey.getAllNotes)) {
                  let data = this.localStorageService.getKey<Note[]>(LocalStorageKey.getAllNotes);
                  data.filter(d => d.id == id);
                  data.push(p);
                } else {
                  this.localStorageService.set(LocalStorageKey.getAllNotes, [p]);
                }
              }));

  }

  public updateNote(note: Note): Observable<Note> {
    return this.noteService.updateNote(note)
              .pipe(tap(p => {
                if(this.localStorageService.hasKey(LocalStorageKey.getAllNotes)) {
                  let data = this.localStorageService.getKey<Note[]>(LocalStorageKey.getAllNotes);
                  data.filter(d => d.id == p.id);
                  data.push(p);
                } else {
                  this.localStorageService.set(LocalStorageKey.getAllNotes, [p]);
                }
              }));
  }

  public deleteNotes(note: Note): Observable<any> {
    return this.noteService.deleteNotes(note)
              .pipe(tap(p => {
                if(this.localStorageService.hasKey(LocalStorageKey.getAllNotes)) {
                  let data = this.localStorageService.getKey<Note[]>(LocalStorageKey.getAllNotes);
                  data.filter(d => d.id == p.id);
                } else {
                  this.localStorageService.set(LocalStorageKey.getAllNotes, [p]);
                }
              }));
  }
}
