import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.url + '/api/categories';
  }

  public addNewCategory(category: Category): Observable<Category> {    
    return this.http.post<Category>(this.baseUrl, category);
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }
}
