import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { CustomErrorStateMatcher } from '../shared/errorstatematcher';
import { Router } from '@angular/router';
import { TokenStorage } from '../token.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  usernameFormCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-z0-9._-]*'),
  ]);
  passwordFormCtrl = new FormControl('', [
    Validators.required
  ]);
  matcher = new CustomErrorStateMatcher();

  constructor(
    private router: Router,
    private token: TokenStorage,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    if (this.token.isLoggedIn()) {
      this.router.navigateByUrl('dashboard');
    }
  }

  loginUser(form: NgForm) {
    this.user = new User ({
      Username: this.usernameFormCtrl.value,
      Password: this.passwordFormCtrl.value
    });
    this.userService.attemptAuth(this.user).subscribe(
      data => {
        this.token.saveToken(data);
        console.log('User is logged in');
        this.router.navigateByUrl('dashboard');
      }
    );
  }

}
