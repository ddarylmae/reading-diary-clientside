import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TokenStorage } from '../token.storage';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { CustomErrorStateMatcher } from '../shared/errorstatematcher';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;
  regForm: FormGroup;
  emailFormCtrl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  usernameFormCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-z0-9._-]*'),
  ]);
  passwordFormCtrl = new FormControl('', [
    Validators.required
  ]);
  confPassFormCtrl = new FormControl('', [
    Validators.required
  ]);
  fnameFormCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Z,a-z, ]*'),
  ]);
  lnameFormCtrl = new FormControl('', [
    Validators.pattern('[A-Z,a-z, ]*'),
  ]);

  matcher = new CustomErrorStateMatcher();

  constructor(private userService: UserService,
    public snackBar: MatSnackBar,
    private token: TokenStorage,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.checkLoggedIn();
    this.createForm();
  }

  checkLoggedIn() {
    if (this.token.isLoggedIn()) {
      this.router.navigateByUrl('dashboard');
    }
  }

  createForm() {
    this.regForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, Validators.required],
    });
  }

  resetForm(form?: NgForm) {
    this.user = new User ({
      Username: '',
      Email: '',
      Password: '',
      Firstname: '',
      Lastname: ''
    });
  }

  onSubmit(form: NgForm) {
    console.log('FORM VALUES: ' + this.usernameFormCtrl.value + ' ' + this.emailFormCtrl.value +
      ' ' + this.passwordFormCtrl.value + ' ' + this.confPassFormCtrl.value + ' ' + this.fnameFormCtrl.value +
      ' ' + this.lnameFormCtrl.value);
      this.user = new User ({
        Username: this.usernameFormCtrl.value,
        Email: this.emailFormCtrl.value,
        Password: this.passwordFormCtrl.value,
        Firstname: this.fnameFormCtrl.value,
        Lastname: this.lnameFormCtrl.value
      });

    // this.userService.registerUser(this.user).subscribe((data: any) => {
    //   if (data.success === true) {
    //     this.resetForm(form);
    //     this.toastrService.success('Successfully registered');
    //   } else {
    //     this.toastrService.error(data.Errors[0]);
    //   }
    // });
    // this.userService.registerUser(this.user).subscribe(
    //   data => {
    //     this.resetForm(form);
    //     // this.userSer.getMaterials();
    //     this.toastrService.success('New reading added!');
    //   }
    // );
    // this.userService.registerUser(this.user).subscribe((data) => {
    //   this.toastrService.success('Successfully registered');
    //   console.log('SUCCESSFUL REGISTRATION');
    //   }, error => { console.log('Error Messages: ' + data.Errors[0]);
    // });
    this.userService.registerUser(this.user).subscribe(
      result => {
        // Handle result
        this.openSnackBar('Successful Registration', 'Success');
        // this.router.navigateByUrl('login');
      },
      error => {
        // console.log('handle error: ' + error);
        this.openSnackBar('Unsuccessful Registration', 'Error');
      }
      // () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      //   console.log('SUCCESSFUL result');
      // }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
