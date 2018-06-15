import { Component, OnInit, Inject} from '@angular/core';
import { ReadingService } from '../shared/reading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { Reading } from '../shared/reading.model';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-reading',
  templateUrl: './add-reading.component.html',
  styleUrls: ['./add-reading.component.css']
})
export class AddReadingComponent implements OnInit {

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

  constructor(
    private readingService: ReadingService,
    private messageService: MessageService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<AddReadingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

  }

  onSubmit(form: NgForm) {
    this.reading = new Reading({
      Title: this.titleFormCtrl.value,
      Author: this.authorFormCtrl.value,
      Link: this.linkFormCtrl.value,
      Summary: this.summaryFormCtrl.value
      // Rating
      // Category
      // Favorite
      // Deleted
    });
    this.readingService.addNewReading(this.reading).subscribe( data => {
      this.dialogRef.close();
      this.router.navigate(['/readings']);
      this.openSnackBar('New reading added!', 'Success');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
