import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import {AuthService} from "../auth.service";
import {BlogpostService} from "../blogpost.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-blogposts',
  templateUrl: './blogposts.component.html',
  styleUrls: ['./blogposts.component.scss']
})
export class BlogpostsComponent implements OnInit {
  blogposts: any
  constructor(private authService: AuthService, private blogPostService: BlogpostService,
    private router: Router) { 
    this.loadPublicBlogPosts();
  }

  ngOnInit(): void {
    M.AutoInit();
  }

  doBlogpostsExist(): boolean {
    return this.blogposts.length != 0;
  }

  navigationHandler(path: string) {
    this.router.navigate([path]);
  }

  loadPublicBlogPosts() {
    const userId = this.authService.getUserId();
    const token = this.authService.getJWToken()
    this.blogPostService.loadPublicBlogPosts(token).subscribe(
      (data) => {
      this.blogposts = data;
    }, (err) => {
        if(err.status == 403) {
            this.authService.logoutUser();
            this.navigationHandler('home');
        } else {
            this.navigationHandler('askcjkqjnqmwmqe')
        }
    })
  }
}
