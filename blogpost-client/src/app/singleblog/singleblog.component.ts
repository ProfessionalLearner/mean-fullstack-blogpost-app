import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {BlogpostService} from "../blogpost.service";
import {Router} from "@angular/router";
import * as M from 'materialize-css';
import { ActivatedRoute} from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-singleblog',
  templateUrl: './singleblog.component.html',
  styleUrls: ['./singleblog.component.scss']
})
export class SingleblogComponent implements OnInit {

  blogId: string;
  blogpostInfo: any;
  constructor(private authService: AuthService, 
    private blogPostService: BlogpostService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    M.AutoInit();
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
        )
        .subscribe(data=> this.blogId = data);

    this.loadBlogPost();
  }

  navigationHandler(path: string) {
    this.router.navigate([path]);
  }

  loadBlogPost() {
    const userId = this.authService.getUserId();
    const token = this.authService.getJWToken();
    const blogId = this.blogId;
    this.blogPostService.loadBlogPost(userId, blogId, token).subscribe(
      (data) => {
      this.blogpostInfo = data;
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
