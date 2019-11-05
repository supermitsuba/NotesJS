import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { CategoryService } from './category.service';
import { LocalStorageKey } from '../models/localStorageKey';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheCategoryService {

  constructor(private localStorageService: LocalStorageService,
    private categoryService: CategoryService) { }

  public addNewCategory(category: Category): Observable<Category> {
    return this.categoryService.addNewCategory(category)
              .pipe(tap(p => {
                if(this.localStorageService.hasKey(LocalStorageKey.getAllCategories)) {
                  let data = this.localStorageService.getKey<Category[]>(LocalStorageKey.getAllCategories);
                  data.filter(d => d.id == p.id);
                  data.push(p);
                } else {
                  this.localStorageService.set(LocalStorageKey.getAllCategories, [p]);
                }
              }));
  }

  public getAllCategories(): Observable<Category[]> {
    return this.categoryService.getAllCategories()
              .pipe(
                tap(p => this.localStorageService.set(LocalStorageKey.getAllCategories, p))
              );
  }
}
