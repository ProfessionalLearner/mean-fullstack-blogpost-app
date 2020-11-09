import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-blognav',
  templateUrl: './blognav.component.html',
  styleUrls: ['./blognav.component.scss']
})
export class BlognavComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    M.AutoInit();
    M.Sidenav.init(document.querySelector('.sidenav'))
  }

  logoutUser() {
    this.authService.logoutUser();
    this.router.navigate(['home'])
  }
}
