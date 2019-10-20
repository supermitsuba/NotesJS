import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  public addNewCategory(category: Category): Observable<Category> {
    return of(category);
  }

  public getAllCategories(): Observable<Category[]> {
    let categories: Category[] = [
      { id: 1, name:'a', createdDate: new Date(), modifiedDate: new Date(), user: null },
      { id: 2, name:'b', createdDate: new Date(), modifiedDate: new Date(), user: null },
      { id: 3, name:'c', createdDate: new Date(), modifiedDate: new Date(), user: null }
    ];
    return of(categories);
  }
}
