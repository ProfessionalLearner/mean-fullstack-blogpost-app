import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from '../user.model';
import * as M from 'materialize-css';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User
  loading: boolean
  constructor() {
    this.user = {username: '', email: '', password: '', confPassword: ''};
    this.loading = false;
  }

  ngOnInit(): void {
  }

  async registerUser(): Promise<any> {
    this.loading = true;
    try {
      let body: any;
      let headers = {};
      if(this.user) {
        body = JSON.stringify(this.user);
        headers["Content-Type"] = 'application/json';
      }
      const resp = await fetch('api/auth/register', {method: "POST", body, headers});
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

      M.toast({html: data.message});
      this.loading = false;

  } catch (err) {
    const messages = err.message.split('\n');
    for(let msg of messages) {
      M.toast({html: msg});
    }
    this.loading = false;
  }
  }


  
}
