import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css"
import {AuthService} from "../auth.service";
import {BlogpostService} from "../blogpost.service";
import { ActivatedRoute} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {Router} from "@angular/router";


@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: ['./editblog.component.scss']
})
export class EditblogComponent implements OnInit {

  blogId: string;
  loading: boolean;
  blogTitle: string;
  blogStatus: string;
  blogBody: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private authService: AuthService, private blogPostService: BlogpostService) {
    this.loading = false;
   }

  ngOnInit(): void {
    M.AutoInit();
    M.FormSelect.init(document.querySelector('#status'))
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
        )
        .subscribe(data=> this.blogId = data);

    console.log(this.blogId);
    this.loadBlogForEdit(this.blogId)

  }

  async loadBlogForEdit(id: string) {
    this.loading = true;
    try {
      const token = this.authService.getJWToken()
      const reqHeaders = {
        'Content-Type': 'application/json',
        "Authorization": token
        };
      const res = await fetch(`api/blogposts/edit/${this.authService.getUserId()}/${id}`, {
        method: "GET", 
        headers: reqHeaders,
    });
      const data = await res.json();
      if(!res.ok) {
        if(res.status == 403) {
          this.authService.logoutUser();
          this.navigationHandler('home');
        } else {
          throw new Error('Something went wrong');
        }
      }

      this.blogTitle = data.title;
      this.blogBody = data.body;
      this.blogStatus = data.status;
      
    } catch(err) {
      this.navigationHandler('asckamkcmakmwkmack');
    } finally {
      this.loading = false;
    }
  }

  selectChangeHandler(e) {
    this.blogStatus = e.target.value;
  }

  titleChangeHandler(e) {
    this.blogTitle = e.target.value;
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

  async updateBlogPost() {
    this.loading = true;
    const title = this.blogTitle;
    const blogBody = this.blogBody;
    const status = this.blogStatus;
    const userId = this.authService.getUserId();
    const currDate = Date.now();
    const newBlogPost = {
      user: userId,
      title: title,
      body: blogBody,
      status: status,
      createdAt: currDate
    }
    const token = this.authService.getJWToken();
    try {
      console.log('update started')
      const success = await this.blogPostService.updateBlogPost(newBlogPost, token, this.blogId);
      console.log('success something aaa')
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
