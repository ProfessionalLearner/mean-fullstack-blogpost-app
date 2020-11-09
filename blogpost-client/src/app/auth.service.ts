import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwToken: string;
  currUser: string;
  userId: string;
  storageName: string = 'userData';

  constructor() { 
    const data = JSON.parse(localStorage.getItem(this.storageName));

    if(data && data.token) {
      this.loginUser(data.token, data.userId, data.username);
    } else {
      this.loginUser(null, null, null);
    }
  }


  loginUser(jwToken: string, userId: string, userName: string): void {
    this.setJWToken(jwToken);
    this.setCurrUser(userName);
    this.setUserId(userId);
    localStorage.setItem(this.storageName, JSON.stringify({
      token: jwToken,
      userId,
      username: userName
    }));
  }

  logoutUser(): void {
    this.setJWToken(null);
    this.setCurrUser(null);
    this.setUserId(null);
    localStorage.removeItem(this.storageName);
  }

  isAuthenticated(): boolean {
    return this.jwToken != null;
  }

  setJWToken(newToken: string) {
    this.jwToken = newToken;
  }

  getJWToken(): string {
    return this.jwToken;
  }

  getUserId(): string {
    return this.userId;
  }

  setUserId(newId: string) {
    this.userId = newId;
  }

  setCurrUser(newUserName: string) {
    this.currUser = newUserName;
  }

  getCurrUser(): string {
    return this.currUser;
  }

}
