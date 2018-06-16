import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
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
    // Validators.pattern('[a-z0-9._-]*'),
  ]);
  passwordFormCtrl = new FormControl('', [
    Validators.required
  ]);
  matcher = new CustomErrorStateMatcher();

  constructor(
    private router: Router,
    private token: TokenStorage,
    public snackBar: MatSnackBar,
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
    if (form.status === 'VALID') {
      this.user = new User ({
        Username: this.usernameFormCtrl.value,
        Password: this.passwordFormCtrl.value
      });
      console.log('form valid');
      this.userService.attemptAuth(this.user).subscribe(
        data => {
          this.token.saveToken(data);
          console.log('User is logged in');
          this.router.navigateByUrl('dashboard');
        },
        error => {
          this.openSnackBar('Invalid login details', 'Error');
        }
      );
    } else {
      console.log('invalid form');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
