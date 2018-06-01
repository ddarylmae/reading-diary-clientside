import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
  // template: `
  // <h1 mat-dialog-title>Add file</h1>
  // <mat-dialog-content>
  // Content goes here
  // {{ catInfo.Id }}
  // {{ catInfo.Name }}
  // {{ catInfo.Description }}
  // </mat-dialog-content>
  // `
})
export class CategoryDetailsComponent implements OnInit {

  catInfo: Category;
  infoDetails = 'SOME INFORMATION';

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(): void {
    // const id = +this.route.snapshot.paramMap.get('Id');
    const id = this.data.catId;
    console.log('CATEGORY ID ' + id);
    this.categoryService.getCategoryDetails(id).subscribe(c => this.catInfo = c);
  }


}
