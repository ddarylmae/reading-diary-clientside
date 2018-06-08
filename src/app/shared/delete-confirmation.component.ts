import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Reading } from './reading.model';

@Component({
  selector: 'delete-confirmation-dialog',
  templateUrl: 'delete-confirmation.component.html',
})
export class DeleteConfirmationDialog {

  reading: Reading;
  
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.reading = data.reading;
    }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}