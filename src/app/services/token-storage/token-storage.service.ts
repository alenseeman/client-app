import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  roles = new Subject();
  constructor() { }

  signOut() {
    window.localStorage.clear();
    this.roles.next([]);
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string|null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user:any) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.roles.next(user.roles);
  }

  public getUser() {
    let data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  }
}
