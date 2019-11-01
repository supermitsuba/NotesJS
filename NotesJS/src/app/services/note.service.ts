import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { switchMap, tap } from 'rxjs/operators';
import { AppConfiguration } from '../models/appConfiguration';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  configuration: Observable<AppConfiguration>;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {  
    this.configuration = this.appConfigService.getConfiguration()
                    .pipe(tap(config => config.apiAddress = `${config.apiAddress}/api/notes`));
  }

  public addNote(newNote: Note): Observable<Note> {
    return this.configuration.pipe(
      switchMap(config =>  this.http.post<Note>(config.apiAddress, newNote))
    );
  }

  public getAllNotes():Observable<Note[]> {
    return this.configuration.pipe(
      switchMap(config => this.http.get<Note[]>(config.apiAddress))
    );
  }

  public getNoteById(id: string): Observable<Note> {
    var newId = id;
    return this.configuration.pipe(
      switchMap(config => this.http.get<Note>(`${config.apiAddress}/${newId}`))
    );
  }

  public updateNote(note: Note): Observable<Note> {
    var newNote = note;
    return this.configuration.pipe(
      switchMap(config => this.http.put<Note>(`${config.apiAddress}/${newNote.id}`, newNote))
    );
  }

  public deleteNotes(note: Note): Observable<any> {
    return this.configuration.pipe(
      switchMap(config => this.http.delete(`${config.apiAddress}/${note.id}`))
    );
  }
}
