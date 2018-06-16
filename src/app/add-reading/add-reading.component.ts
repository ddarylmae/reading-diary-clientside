import { Component, OnInit, Inject} from '@angular/core';
import { ReadingService } from '../shared/reading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { Reading } from '../shared/reading.model';
import * as moment from 'moment';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
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
  linkFormCtrl = new FormControl('', [
    Validators.required
  ]);
  passwordFormCtrl = new FormControl('', [
    Validators.required
  ]);
  summaryFormCtrl = new FormControl('', [
    Validators.required,
    Validators.maxLength(200)
  ]);
  dateFormCtrl = new FormControl();

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
    const offset = moment(this.dateFormCtrl.value).utcOffset();
    // let date = new Date(moment(this.dateFormCtrl.value).format('YYYY MM DD'));
    const date = this.dateFormCtrl.value.toLocaleDateString();
    const newdate = new Date(moment(date).format('YYYY-MM-DD HH:mm:ss'));
    this.reading = new Reading({
      Title: this.titleFormCtrl.value,
      Author: this.authorFormCtrl.value,
      Link: this.linkFormCtrl.value,
      Summary: this.summaryFormCtrl.value,
      Date: newdate,
      // Rating
      Category: this.selectedCategory
      // Favorite
    });
    console.log('offset ' + newdate);
    this.readingService.addNewReading(this.reading).subscribe( data => {
      this.dialogRef.close();
      this.router.navigate(['/readings']);
      this.openSnackBar('New reading added!', 'Success');
    });
  }

  saveReading() {
    console.log('CALLED SAVE');
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(c => {
      this.categories = c;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
