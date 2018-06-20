import { Component, OnInit, Inject} from '@angular/core';
import { ReadingService } from '../shared/reading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { Reading } from '../shared/reading.model';
import * as moment from 'moment';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CustomErrorStateMatcher } from '../shared/errorstatematcher';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-add-reading',
  templateUrl: './add-reading.component.html',
  styleUrls: ['./add-reading.component.css']
})
export class AddReadingComponent implements OnInit {

  categories: Category[];
  selectedCategory = 1;

  reading: Reading;
  titleFormCtrl = new FormControl('', [
    Validators.required
  ]);
  authorFormCtrl = new FormControl('', [
    Validators.required
  ]);
  linkFormCtrl = new FormControl('', );
  summaryFormCtrl = new FormControl('', [
    Validators.maxLength(300)
  ]);

  dateFormCtrl = new FormControl({value: ''});
  matcher = new CustomErrorStateMatcher();

  constructor(
    private readingService: ReadingService,
    private messageService: MessageService,
    public snackBar: MatSnackBar,
    private router: Router,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<AddReadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  onSubmit(form: NgForm) {
    if (this.isFormValid()) {
      console.log('Add date: ' + this.dateFormCtrl.value);
      this.reading = new Reading({
        Title: this.titleFormCtrl.value,
        Author: this.authorFormCtrl.value,
        Link: this.linkFormCtrl.value,
        Summary: this.summaryFormCtrl.value,
        Date: this.dateFormCtrl.value,
        // Rating
        Category: this.selectedCategory
        // Favorite
      });
      this.readingService.addNewReading(this.reading).subscribe( data => {
        this.dialogRef.close();
        this.router.navigate(['/readings']);
        this.openSnackBar('New reading added!', 'Success');
      });
    } else {
      this.openSnackBar('Please enter required fields.', 'Error');
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

  saveReading() {
    console.log('CALLED SAVE');
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(c => {
      this.categories = c;
    });
  }

  isFormValid(): Boolean {
    if (this.titleFormCtrl.status === 'INVALID' || this.authorFormCtrl.value === '') {
      return false;
    }
    return true;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
