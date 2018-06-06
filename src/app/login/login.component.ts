import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm, Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { CustomErrorStateMatcher } from '../shared/errorstatematcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameFormCtrl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-z0-9._-]*'),
  ]);
  passwordFormCtrl = new FormControl('', [
    Validators.required
  ]);
  matcher = new CustomErrorStateMatcher();

  constructor() { }

  ngOnInit() {
  }

}
