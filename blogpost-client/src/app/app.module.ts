import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import { AddblogComponent } from './addblog/addblog.component';
import { EditblogComponent } from './editblog/editblog.component';
import { SingleblogComponent } from './singleblog/singleblog.component';
import { BlognavComponent } from './blognav/blognav.component';
import { BlogpostsComponent } from './blogposts/blogposts.component';
import { FirstNWordsPipe } from './first-nwords.pipe';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotfoundComponent,
    WelcomeComponent,
    AddblogComponent,
    EditblogComponent,
    SingleblogComponent,
    BlognavComponent,
    BlogpostsComponent,
    FirstNWordsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
