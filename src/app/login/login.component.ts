import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { AuthService } from '../shared/auth.service';
import { CustomErrorStateMatcher } from '../shared/errorstatematcher';
import { Router } from '@angular/router';

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
    // private token: TokenStorage
    // private userService: UserService
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logoutUser() {
    console.log('LOGOUTUSER CLICKED');
    this.authService.logout();
  }

  loginUser(form: NgForm) {
    // this.userService.attemptAuth(this.usernameFormCtrl.value, this.passwordFormCtrl.value).subscribe(
    //   data => {
    //     // this.token.
    //   }
    // );
    // console.log('VALUES: ' + this.usernameFormCtrl.value + ' ' + this.passwordFormCtrl.value);
    this.user = new User ({
      Username: this.usernameFormCtrl.value,
      Password: this.passwordFormCtrl.value
    });
    this.authService.login(this.user).subscribe(
      data => {
        // this.token.
        console.log('User is logged in');
        this.router.navigateByUrl('dashboard');
      }
    );
  }

}
