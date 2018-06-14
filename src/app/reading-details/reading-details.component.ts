import { Component, OnInit, Inject, EventEmitter, ViewEncapsulation, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, 
  MatDialogRef, 
  MatDialog,
  MatDatepicker, 
  MatNativeDateModule,
  MatSelectModule  } from '@angular/material';
import { Reading } from '../shared/reading.model';
import { ReadingService } from '../shared/reading.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';
import { MatInputModule } from '@angular/material/input';
import { DeleteConfDialogComponent } from '../shared/delete-confirmation.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reading-details',
  templateUrl: './reading-details.component.html',
  styleUrls: ['./reading-details.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})

export class ReadingDetailsComponent implements OnInit {

  @Output() private readingDeleted = new EventEmitter();
  reading: Reading;
  category: Category;
  //categoryName: string;
  isEditButton: Boolean = true;
  deletedReading: Reading;
  selectedDate: Date; 
  date = new FormControl(new Date());
  selectedCategory: number;
  title = new FormControl('', [Validators.required]);
  author = new FormControl('', [Validators.required]);
  emptyRequiredFields: Boolean = false;

  categories = [
    {value: 1, viewValue: "Technical"},
    {value: 7, viewValue: "Personal stuff"},
    {value: 8, viewValue: "'Christian"}
  ];


  constructor(
    private readingService: ReadingService,
    private categoryService: CategoryService,
    private router: Router,
    public detailsDialogRef: MatDialogRef<ReadingDetailsComponent>,
    public deleteConfirmationDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
    this.getReading();
    this.selectedCategory = this.reading.Category; 
  }

  disableSaveButton(){
    this.emptyRequiredFields = true;
  }

  enableSaveButton(){
    this.emptyRequiredFields = false;
  }

  getReading(): void {
    this.reading = this.data.reading;
  }

  getCategory(): void {
    const id = this.reading.Category;
    if (id != null) {
      // console.log('CATEGORY ID ' + id);
      this.categoryService.getCategoryDetails(id).subscribe(c => this.category = c);
      //this.categoryName = this.category.Name;
    }
  }

  updateReading(): void {
    this.reading.Category = this.selectedCategory;
    this.reading.DateRead = this.selectedDate;
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
  
  changeDate (): void {
    this.reading.DateRead = this.date.value;
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
      (data: void) => console.log('${this.reading.Title} deleted successfully.'),
      (err: any) => console.log(err)
    );
    this.readingDeleted.emit(this.reading.Id);
  }

  openConfirmationDialog(): void {
    const dialogRef = this.deleteConfirmationDialog.open(DeleteConfDialogComponent, {
      width: '400px',
      data: { reading: this.reading }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete confirmation dialog was closed');
      if (result != null) {
        this.deletedReading = result;
        this.deleteReading();
        this.detailsDialogRef.close(result);
        this.router.navigate(['/readings']);
      }
    });
  }
}

