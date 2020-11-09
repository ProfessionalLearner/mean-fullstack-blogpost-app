import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {AddblogComponent} from './addblog/addblog.component';
import {EditblogComponent} from './editblog/editblog.component';
import {BlogpostsComponent} from './blogposts/blogposts.component';
import {AuthGuard} from './auth.guard';
import {NegAuthGuard} from './neg-auth.guard';
import { SingleblogComponent } from './singleblog/singleblog.component';


const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: 'home', component:WelcomeComponent, canActivate:[NegAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate:[NegAuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate:[NegAuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'blogposts', component: BlogpostsComponent, canActivate: [AuthGuard]},
  {path: 'blogposts/create', component: AddblogComponent, canActivate: [AuthGuard]},
  {path: 'blogposts/edit/:id', component: EditblogComponent, canActivate: [AuthGuard]},
  {path: 'blogposts/:id', component: SingleblogComponent, canActivate: [AuthGuard]},
  {path: "**", component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, NegAuthGuard],
})
export class AppRoutingModule { }
