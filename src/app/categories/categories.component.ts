import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {

  categoryList: Category[];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => this.categoryList = categories);
  }

  viewDetails(category: Category): void {
    confirm('All details: ' + category.Id + ', ' + category.Name + ', ' + category.Description);
  }

}
