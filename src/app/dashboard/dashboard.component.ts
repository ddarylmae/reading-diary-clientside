import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { MatDialogRef, MatDialog } from '@angular/material';
import { UserService } from '../shared/user.service';
import { ReadingService } from '../shared/reading.service';
import { Reading } from '../shared/reading.model';
import { AddReadingComponent } from '../add-reading/add-reading.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  lastRead: Reading;
  bookCount = 0;
  addReadingRef: MatDialogRef<AddReadingComponent>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private readingService: ReadingService) {
  }

  ngOnInit() {
    this.initializeValues();
    this.getLatest();
    this.getStatistics();
    this.getUserInfo();
  }

  initializeValues() {
    this.lastRead = new Reading({
      Title: '',
      Author: ''
    });
  }

  logout() {
    this.userService.logoutUser();
  }

  getLatest(): void {
    this.readingService.getLatestReading().subscribe(c => { this.lastRead = c; });
  }

  getStatistics(): void {
    this.readingService.getReadingsCount().subscribe(c => {
      this.bookCount = c;
    });
  }

  getUserInfo(): void {
    this.currentUser = new User();
    this.currentUser.Firstname = this.userService.getCurrentUserFname();
  }

  addNewReading() {
    // open dialog
    this.addReadingRef = this.dialog.open(AddReadingComponent, {
      height: '450px',
      width: '600px',
      data: {
      }
    });

    this.addReadingRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.reading = result;
    });
  }

}
