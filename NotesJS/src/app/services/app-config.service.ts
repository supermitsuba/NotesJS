import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfiguration } from '../models/appConfiguration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor(private http: HttpClient) { }

  getConfiguration():Observable<AppConfiguration> {
    return this.http.get<AppConfiguration>('/assets/appConfig.txt');
  }
}
