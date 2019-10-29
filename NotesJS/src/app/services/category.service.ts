import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { AppConfiguration } from '../models/appConfiguration';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  configuration: Observable<AppConfiguration>;

  constructor(private http: HttpClient, private appConfigService: AppConfigService) { 
    this.configuration = this.appConfigService.getConfiguration()
                    .pipe(tap(config => config.apiAddress = `${config.apiAddress}/api/categories`));
  }

  public addNewCategory(category: Category): Observable<Category> {
    return this.configuration.pipe(
      switchMap(config => this.http.post<Category>(config.apiAddress, category))
    );
  }

  public getAllCategories(): Observable<Category[]> {
    return this.configuration.pipe(
      switchMap(config => this.http.get<Category[]>(config.apiAddress))
    );
  }
}
