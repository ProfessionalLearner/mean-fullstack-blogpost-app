import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import {User} from '../user.model';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User
  loading: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.user = {email: '', password: ''}
    this.loading = false;
  }

  ngOnInit(): void {
  }

  async loginUser(): Promise<any> {
    this.loading = true
    try {
      let body: any;
      let headers = {};
      if(this.user) {
        body = JSON.stringify(this.user);
        headers["Content-Type"] = 'application/json';
      }
      const resp = await fetch('api/auth/login', {method: "POST", body, headers});
      const data = await resp.json();

      if(!resp.ok) {
        let errorMsg = data.message;
        if(data.errors) {
            
          for(let i=0; i < data.errors.length; i++) {
            errorMsg += '\n' + data.errors[i].msg;
          }
        }
        throw new Error(errorMsg|| "Something went wrong, try again");
      }

      this.authService.loginUser(data.token, data.userId, data.username);
      this.loading = false;
      this.router.navigate(['dashboard']);

  } catch (err) {
    const messages = err.message.split('\n');
    for(let msg of messages) {
      M.toast({html: msg});
    }
    this.loading = false;
  }
  }

}
