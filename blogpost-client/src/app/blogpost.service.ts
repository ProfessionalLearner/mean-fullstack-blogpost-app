import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {AuthService} from "./auth.service";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import {Blogpost} from "./blogpost.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router) { }


  async createBlogPost(newBlogPost: Blogpost, token: string): Promise<any> {
    let headers = new HttpHeaders().append("Content-Type", "application/json")
      .append("Authorization", token)
    try {
      let data = await this.http.post('api/blogposts/', {...newBlogPost}, {headers}).toPromise()
      return true;
    } catch(err) {
      throw new Error(err.response.status)
    }
  }

  async updateBlogPost(newBlogPost: Blogpost, token: string, id: string): Promise<any> {
    let headers = new HttpHeaders().append("Content-Type", "application/json")
      .append("Authorization", token)
    try {
      let data = await this.http.put(`api/blogposts/${id}`, {...newBlogPost}, {headers}).toPromise()
      return true;
    } catch(err) {
      throw new Error(err.response.status)
    }
  }

  loadBlogPostsForUser(userId: string, token: string): Observable<any> {
    let headers = new HttpHeaders().append("Authorization", token);
    return this.http.get(`api/blogposts/user/${userId}`, {headers});

  }

  loadPublicBlogPosts(token: string): Observable<any[]> {
    let headers = new HttpHeaders().append("Authorization", token);
    const url = 'api/blogposts/';
    return this.http.get<any[]>(url, {headers});
  }

  async deleteBlogPost(userId: string, blogId: string, token: string) {
    let headers = new HttpHeaders().append("Authorization", token);
    try {
      await this.http.delete(`api/blogposts/${userId}/${blogId}`, {headers}).toPromise();
    } catch(err) {
      throw new Error(err.response.status)
    }
  }


  loadBlogPost(userId: string, blogId: string, token: string): Observable<any> {
    token = token.trim();
    blogId = blogId.trim();
    userId= userId.trim();
    const url = "api/blogposts/blogpost/" + userId + "/" + blogId;
    let headers = new HttpHeaders().append("Authorization", token);
    return this.http.get(url, {headers});

  }

}


