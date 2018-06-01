import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    this.user = new User ({
      Username: '',
      Email: '',
      Password: { pwd: '', confirmPwd: '' },
      Firstname: '',
      Lastname: ''
    });
  }

  onSubmit(form: NgForm) {
    this.userService.registerUser(form.value).subscribe((data: any) => {
      if (data.Succeeded === true) {
        this.resetForm(form);
        this.toastrService.success('Successfully registered');
      } else {
        this.toastrService.error(data.Errors[0]);
      }
    });
  }

}
