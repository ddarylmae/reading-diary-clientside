import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Reading } from './reading.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: 'delete-confirmation.component.html',
})
export class DeleteConfDialogComponent {

  reading: Reading;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.reading = data.reading;
    }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
