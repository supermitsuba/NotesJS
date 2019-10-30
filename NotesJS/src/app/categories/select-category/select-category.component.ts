import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LocalStorageKey } from 'src/app/models/localStorageKey';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {

  public categories: Category[];
  public selectedCategory: Category;

  @Input()
  hasAllSelection: string; // weird bug where template sets this to string even if its a boolean.

  @Input()
  defaultIndex: number;

  @Input()
  useStoredCategory: string; // weird bug where template sets this to string even if its a boolean.
  
  @Output() 
  messageEvent = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService, private storageService: LocalStorageService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  public getAllCategories() {
    this.categoryService.getAllCategories()
        .subscribe( c => {
          this.categories = c;
          this.createAllCategory();
          this.setSelectedCategory();
        });
  }

  setSelectedCategory() {
    this.defaultIndex = Number(this.defaultIndex);
    const use = this.useStoredCategory === "true";
    if(this.defaultIndex > -1) {
      if(use && this.storageService.getKey(LocalStorageKey.selectedCategory) ) {
        const temp:Category = this.storageService.getKey(LocalStorageKey.selectedCategory);
        const index:number = this.categories.findIndex(c => c.id === temp.id);
        this.selectedCategory = this.categories[index];
      } else {
        this.selectedCategory = this.categories[this.defaultIndex];
      }
      this.messageEvent.emit(this.selectedCategory);
    }
  }

  onChange(selectedCategory: Category) {
    this.storageService.set(LocalStorageKey.selectedCategory, selectedCategory);
    this.messageEvent.emit(selectedCategory);
  }

  createAllCategory(): void {
    const has = this.hasAllSelection === "true";
    if (has) {
      const allCategory = new Category();
      allCategory.id = "All";
      allCategory.name = "View All Categories";
      this.categories.unshift(allCategory);
    }
  } 
}
