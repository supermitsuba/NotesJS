import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {

  public categories: Category[];
  public selectedCategory: Category;
  
  @Output() 
  messageEvent = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  public getAllCategories() {
    this.categoryService.getAllCategories()
        .subscribe( c => {
          this.categories = c
        });
  }

  onChange(selectedCategory: Category) {
    this.messageEvent.emit(selectedCategory);
  }
}
