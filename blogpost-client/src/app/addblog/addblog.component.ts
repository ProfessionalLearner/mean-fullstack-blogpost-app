import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {BlogpostService} from "../blogpost.service";

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.scss']
})
export class AddblogComponent implements OnInit {

  title: string;
  blogStatus: string;
  blogBody: string;
  loading: boolean;

  constructor(private router: Router, private authService: AuthService,
    private blogPostService: BlogpostService) { 
    this.title = "";
    this.blogStatus = "private";
    this.blogBody = "";
    this.loading = false;
  }

  ngOnInit(): void {
    M.AutoInit();
    M.FormSelect.init(document.querySelector('select'))
  }

  selectChangeHandler(e) {
    this.blogStatus = e.target.value;
  }

  titleChangeHandler(e) {
    this.title = e.target.value;
  }

  bodyChangeHandler(e) {
    this.blogBody = e.target.value;
  }

  cancelHandler() {
    this.router.navigate(['dashboard']);
  }

  navigationHandler(path: string) {
    this.router.navigate([path]);
  }

  async submitBlogPost() {
    this.loading = true;
    const title = this.title;
    const blogBody = this.blogBody;
    const status = this.blogStatus;
    const userId = this.authService.getUserId();
    const user = {
      user: userId,
      title: title,
      body: blogBody,
      status: status
    }
    const token = this.authService.getJWToken();
    try {
      const success = await this.blogPostService.createBlogPost(user, token);
      this.navigationHandler('dashboard');
    } catch(err) {
      if(err.message == "401" || err.message == "403") {
        this.authService.logoutUser();
        this.navigationHandler('home')
      } else {
        this.navigationHandler('kamkcmakmwqkmdkcq')
      }
    } finally {
      this.loading = false;
    }
  }

}
