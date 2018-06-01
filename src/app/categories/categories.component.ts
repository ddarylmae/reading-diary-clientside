import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CategoryDetailsComponent } from '../category-details/category-details.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {

  categoryDetailsRef: MatDialogRef<CategoryDetailsComponent>;

  categoryList: Category[];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => this.categoryList = categories);
  }

  viewDetails(id: number): void {
    // confirm('All details: ' + category.Id + ', ' + category.Name + ', ' + category.Description);
    this.categoryDetailsRef = this.dialog.open(CategoryDetailsComponent, {
      hasBackdrop: false,
      height: '400px',
      width: '600px',
      data: {
        catId: id
      }
    });
  }

}
