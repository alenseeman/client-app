import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenStorageService} from "../token-storage/token-storage.service";
import {EnvironmentUrlService} from "../environment-url/environment-url.service";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService,
              private envUrl: EnvironmentUrlService) {
    if(this.tokenStorageService.getUser()) {
      this.loggedIn.next(true);
    }
  }

  private loggedIn = new BehaviorSubject<boolean>(false);


  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public userLoggedIn() {
    this.loggedIn.next(true);
  }

  login(credentials:any): Observable<any> {
    return this.http.post( this.envUrl.urlAddress + 'login', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user:any): Observable<any> {
    return this.http.post( this.envUrl.urlAddress + 'register', user);
  }

  logout() {
    this.loggedIn.next(false);
  }
}
