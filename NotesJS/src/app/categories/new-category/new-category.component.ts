import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  category: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.category = new Category();
    this.category.name = '';
  }

  addCategory() {
    this.categoryService.addNewCategory(this.category)
        .subscribe(
          p => {
            alert('Saved '+ this.category.name);
            this.category.name = '';
          }, 
          error => {
            alert('Could not save categoryName: '+ this.category.name);
            console.log(error);
          });
  }
}
