import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.url + '/api/notes';
  }

  public addNote(newNote: Note): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, newNote);
  }

  public getAllNotes():Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }
}
