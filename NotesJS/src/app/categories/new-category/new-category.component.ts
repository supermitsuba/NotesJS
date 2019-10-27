import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  name: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  addCategory() {
    let newCategory = new Category();
    newCategory.name = this.name;

    if(this.name && this.name.trim() !== '') {
      this.categoryService.addNewCategory(newCategory)
          .subscribe(
            p => {
              alert('Saved '+ this.name);
              this.name = '';
            }, 
            error => {
              alert('Could not save categoryName: '+ this.name);
              console.log(error);
            });
      return;
    }

    alert('This is an invalid category!');
  }
}
