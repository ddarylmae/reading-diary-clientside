import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Reading } from '../shared/reading.model';
import { ReadingService } from '../shared/reading.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reading-details',
  templateUrl: './reading-details.component.html',
  styleUrls: ['./reading-details.component.css']
})

export class ReadingDetailsComponent implements OnInit {

  reading: Reading;
  category: Category;
  categoryName: string;
  isEditButton: Boolean = true;

  constructor(
    private readingService: ReadingService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.getReading();
  }

  getReading(): void {
    this.reading = this.data.reading;
  }

  getCategory(): void {
    const id = this.reading.Category;
    if (id != null) {
      // console.log('CATEGORY ID ' + id);
      this.categoryService.getCategoryDetails(id).subscribe(c => this.category = c);
      this.categoryName = this.category.Name;
    }
  }

  updateReading(): void {
    this.readingService.updateReading (this.reading)
    .subscribe(
      (data: void) => console.log('${this.reading.Title} updated successfully.'),
      (err: any) => console.log(err)
    );

  }
  enableEditSaveMode(): void {
    if (this.isEditButton) {
      this.isEditButton = false;
    } else {
      this.updateReading();
      this.isEditButton = true;
    }
  }

  updateRating(updatedRating): void {
    this.reading.Rating = updatedRating;

    this.readingService.updateReading (this.reading)
    .subscribe(
      (data: void) => console.log('${this.reading.Title} updated successfully.'),
      (err: any) => console.log(err)
    );
  }

  deleteReading(): void {
    this.readingService.deleteReading (this.reading)
    .subscribe(
      (data: void) => console.log('${this.reading.Title} updated successfully.'),
      (err: any) => console.log(err)
    );
  }

}
