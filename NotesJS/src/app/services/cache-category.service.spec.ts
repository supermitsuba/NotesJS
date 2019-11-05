import { TestBed } from '@angular/core/testing';

import { CacheCategoryService } from './cache-category.service';

describe('CacheCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheCategoryService = TestBed.get(CacheCategoryService);
    expect(service).toBeTruthy();
  });
});
