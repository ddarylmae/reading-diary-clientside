import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../shared/script.service';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  name = 'Jane';

  constructor(
    private script: ScriptService,
    private userService: UserService) {
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logoutUser();
  }

}
