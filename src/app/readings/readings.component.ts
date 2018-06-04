import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { Reading } from '../shared/reading.model';
import { ReadingService } from '../shared/reading.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ReadingDetailsComponent } from '../reading-details/reading-details.component';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.css']
})
export class ReadingsComponent implements OnInit {

  readingList: Reading[];
  readingDetailsRef: MatDialogRef<ReadingDetailsComponent>;

  constructor(
    private readingService: ReadingService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getReadings();
  }

  getReadings(): void {
    this.readingService.getAllReadings().subscribe(readings => this.readingList = readings);
  }

  viewDetails(currentReading: Reading): void {
    this.readingDetailsRef = this.dialog.open(ReadingDetailsComponent, {
      hasBackdrop: false,
      height: '400px',
      width: '600px',
      data: {
        reading: currentReading
      }
    });
  }


}
