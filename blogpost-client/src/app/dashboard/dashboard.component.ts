import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import * as M from 'materialize-css';
import {AuthService} from '../auth.service';
import {BlogpostService} from "../blogpost.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  userPosts: any[]
  loading: boolean
  constructor(private authService: AuthService, private blogPostService: BlogpostService,
    private router: Router, private cdr: ChangeDetectorRef) { 
      this.loading = false;
      this.userPosts = [];
      this.loadBlogPostsForUser();
  }

  ngOnInit(): void {
    M.AutoInit()
  }

  doBlogpostExist(): boolean {
    return this.userPosts.length != 0;
  }

  getUserName(): string {
    return this.authService.getCurrUser();
  }

  navigationHandler(path: string) {
    this.router.navigate([path]);
  }

  async deleteBlogPosts(blogId: string) {
    const token = this.authService.getJWToken();
    const userId = this.authService.getUserId();
    try {
      const success = await this.blogPostService.deleteBlogPost(userId, blogId, token);
      this.loadBlogPostsForUser();
    } catch(err) {
      if(err.message == "401" || err.message == "403") {
        this.authService.logoutUser();
        this.navigationHandler('home')
      } else {
        this.navigationHandler('kamkcmakmwqkmdkcq')
      }
    }
  }

  loadBlogPostsForUser() {
    const userId = this.authService.getUserId();
    const token = this.authService.getJWToken()
    this.blogPostService.loadBlogPostsForUser(userId, token).subscribe(
      (data) => {
        this.userPosts = data;
        this.cdr.markForCheck();
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
