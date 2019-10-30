import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../models/localStorageKey';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getKey<T>(key: LocalStorageKey): T {
    return JSON.parse(localStorage.getItem(key));
  }

  set<T>(key: LocalStorageKey, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
