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
  // reading: Reading;
  
  _listFilter: string;
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      if(this.listFilter){ 
        this.readingList = this.performFilter(this.listFilter);
       }else{
        this.getReadings();
       }
  }
  readingDetailsRef: MatDialogRef<ReadingDetailsComponent>;

  constructor(
    private readingService: ReadingService,
    private dialog: MatDialog
  ) { }

  performFilter(filterBy: string): Reading[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.readingList.filter((reading: Reading) =>
          reading.Title.toLocaleLowerCase().indexOf(filterBy) !== -1 );
}

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

  pageTitle: string = 'Reading List';
  
}
