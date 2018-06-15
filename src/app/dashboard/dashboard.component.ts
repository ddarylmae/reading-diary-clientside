import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { ReadingService } from '../shared/reading.service';
import { Reading } from '../shared/reading.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  lastRead: Reading;
  bookCount = 0;

  constructor(
    private userService: UserService,
    private readingService: ReadingService) {
  }

  ngOnInit() {
    this.getLatest();
    this.getStatistics();
    this.getUserInfo();
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
      console.log('permonth value is ' + this.bookCount);
    });
  }

  getUserInfo(): void {
    this.currentUser = new User();
    this.currentUser.Firstname = this.userService.getCurrentUserFname();
  }

}
