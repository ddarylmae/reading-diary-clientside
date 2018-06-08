import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { Reading } from '../shared/reading.model';
import { ReadingService } from '../shared/reading.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ReadingDetailsComponent } from '../reading-details/reading-details.component';
import { UserService } from '../shared/user.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.css']
})
export class ReadingsComponent implements OnInit {

  readingList: Reading[];
  readingDetailsRef: MatDialogRef<ReadingDetailsComponent>;
  readingDeleted: Reading;

  constructor(
    private readingService: ReadingService,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getReadings();
  }

  getReadings(): void {
    this.readingService.getAllReadings().subscribe(readings => this.readingList = readings);
  }

  viewDetails(currentReading: Reading): void {
    this.readingDetailsRef = this.dialog.open(ReadingDetailsComponent, {
      // disableClose: true,
      // hasBackdrop: false,
      height: '450px',
      width: '600px',
      data: {
        reading: currentReading
      }
    });
    this.readingDetailsRef.afterClosed().subscribe(
      deletedReading => {
      console.log('The reading details dialog was closed');
      if (deletedReading !== '') {
        console.log('The reading array should be updated here');
        // const index: number = this.readingList.findIndex(reading => reading.Id === deletedReading.Id);
        // this.readingList.splice(index, 1);
        // this.readingDeleted.Id = deletedReadingId;
        this.getReadings();
      }

    });
  }

  logout() {
    this.userService.logoutUser();
  }

}
