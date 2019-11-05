import { TestBed } from '@angular/core/testing';

import { CacheNotesService } from './cache-notes.service';

describe('CacheNotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheNotesService = TestBed.get(CacheNotesService);
    expect(service).toBeTruthy();
  });
});
