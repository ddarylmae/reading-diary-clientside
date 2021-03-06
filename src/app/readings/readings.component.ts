import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { Reading } from '../shared/reading.model';
import { ReadingService } from '../shared/reading.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ReadingDetailsComponent } from '../reading-details/reading-details.component';
import { UserService } from '../shared/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddReadingComponent } from '../add-reading/add-reading.component';
import { MatInputModule } from '@angular/material/input';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.css']
})
export class ReadingsComponent implements OnInit {

  currentUser: User;
  readingList: Reading[];
  _listFilter: string;
  faveStatus = 1;
  favoriteIcon = 'favorite';

  readingDetailsRef: MatDialogRef<ReadingDetailsComponent>;
  addReadingRef: MatDialogRef<AddReadingComponent>;
  readingDeleted: Reading;

  constructor(
    private readingService: ReadingService,
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getReadings();
    this.getUserInfo();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    require('../../assets/mdl/material.js');
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    if (this.listFilter) {
      this.readingList = this.performFilter(this.listFilter);
    } else {
      this.getReadings();
    }
  }

  performFilter(filterBy: string): Reading[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.readingList.filter((reading: Reading) =>
      reading.Title.toLocaleLowerCase().indexOf(filterBy) !== -1 );
  }

  toggleFavorite(id: number): void {
    console.log('TOGGLE CALLED ' + id);
    this.readingService.updateFavorite(id).subscribe();
    // this.getReadings();
    this.readingList.forEach(reading => {
      if (reading.Id === id && reading.Favorite != null) {
        reading.Favorite = (reading.Favorite === 0) ? 1 : 0;
      }
    });
  }

  getUserInfo(): void {
    this.currentUser = new User();
    this.currentUser = this.userService.getCurrentUserDetails();
  }

  getReadings(): void {
    this.readingService.getAllReadings().subscribe(
      readings => this.readingList = readings
    );
  }

  getByCategory(categoryId: number): void {
    console.log('getByCategory comp ' + categoryId);
    this.readingService.getReadingsByCategory(categoryId).subscribe(
      readings => this.readingList = readings
    );
  }

  viewDetails(currentReading: Reading): void {
    this.readingDetailsRef = this.dialog.open(ReadingDetailsComponent, {
      // disableClose: true,
      // hasBackdrop: false,
      height: '520px',
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
        this.getReadings();
      }
    });
  }

  addNewReading() {
    // open dialog
    this.addReadingRef = this.dialog.open(AddReadingComponent, {
      height: '520px',
      width: '600px',
      data: {
      }
    });

    this.addReadingRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getReadings();
    });
  }

  logout() {
    this.userService.logoutUser();
  }

}
