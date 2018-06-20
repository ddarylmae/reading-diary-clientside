import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TokenStorage } from '../token.storage';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { CustomErrorStateMatcher } from '../shared/errorstatematcher';
// import { PasswordValidation } from '../shared/password.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;
  // regForm: FormGroup;

  passGrpForm = new FormGroup({
    pwordFormCtrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confPwordFormCtrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
  }, this.passwordMatchValidator);

  emailFormCtrl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  usernameFormCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-z0-9._-]*'),
    Validators.maxLength(50)
  ]);
  passwordFormCtrl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
    Validators.minLength(5)
  ]);
  confPassFormCtrl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50)
  ]);
  fnameFormCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern('[A-Z,a-z, ]*'),
    Validators.maxLength(50)
  ]);
  lnameFormCtrl = new FormControl('', [
    Validators.pattern('[A-Z,a-z, ]*'),
    Validators.maxLength(50)
  ]);

  matcher = new CustomErrorStateMatcher();

  constructor(private userService: UserService,
    public snackBar: MatSnackBar,
    private token: TokenStorage,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.checkLoggedIn();
    // this.createForm();
  }

  checkLoggedIn() {
    if (this.token.isLoggedIn()) {
      this.router.navigateByUrl('dashboard');
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('pwordFormCtrl').value === g.get('confPwordFormCtrl').value
       ? null : {'mismatch': true};
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
      ' ' + this.lnameFormCtrl.value + ' ' + this.passwordFormCtrl.value + ' ' + this.confPassFormCtrl.value);
    if (this.isSignUpFormValid() && this.arePasswordsSame()) {
      this.user = new User ({
        Username: this.usernameFormCtrl.value,
        Email: this.emailFormCtrl.value,
        Password: this.passwordFormCtrl.value,
        Firstname: this.fnameFormCtrl.value,
        Lastname: this.lnameFormCtrl.value
      });
      this.userService.registerUser(this.user).subscribe(
        result => {
          // Handle result
          this.openSnackBar('Successful Registration', 'Success');
          this.router.navigateByUrl('/login');
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
    } else if (this.isSignUpFormValid()) {
      this.openSnackBar('Passwords do not match', 'Error');
    } else {
      this.openSnackBar('Please enter valid inputs', 'Error');
    }
  }

  private isSignUpFormValid(): boolean {
    if (this.usernameFormCtrl.status === 'INVALID' || this.emailFormCtrl.status === 'INVALID' ||
      this.passwordFormCtrl.status === 'INVALID' || this.confPassFormCtrl.status === 'INVALID' ||
      this.fnameFormCtrl.status === 'INVALID' || this.lnameFormCtrl.status === 'INVALID') {
        return false;
    }
    return true;
  }

  private arePasswordsSame(): boolean {
    return (this.passwordFormCtrl.value === this.confPassFormCtrl.value) ? true : false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
