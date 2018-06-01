import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { MessageService } from './message.service';
import { User } from './user.model';

@Injectable()
export class UserService {

  private baseUrl = 'http://localhost:51956/';
  private user: User;

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      Username: user.Username,
      Password: {
        pwd: user.Password.pwd,
        confirmPwd: user.Password.confirmPwd
      },
      Email: user.Email,
      Firstname: user.Firstname,
      Lastname: user.Lastname
    };
    return this.http.post(this.baseUrl + '/api/user/registration', body);
  }

}
