import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpService } from '../../services/httpService/http.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../ang-material/app-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'work-time-login',
  standalone: true,
  imports: [
    NgIf,
    AppMaterialModule,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  public username: string = '';
  //public pass: string;
  public hidePassword = true;
  public loggedIn = false;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private httpService: HttpService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;

      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe({
      next: (data) => {
        console.log('data from login ' + data);
        console.log(data);
        debugger;
        this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUser(data);
            this.authService.userLoggedIn();

            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this._snackBar.open('You successfully logged in!', 'Close', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: ['successSnackBar']
            });

            this.router.navigate(['/home']);
      },
      error: (err) => {
        this._snackBar.open('Login failed!', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['errorSnackBar']
        });
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    })
  }

  public login() {
    this.httpService.get('/users').subscribe({
        next: (res:any) =>{
          console.log(res);
          this.loggedIn = true;
          localStorage.setItem('xAuthToken', res.toLocaleString()); // res.json().token neki
        },
        error: (error) =>{
          console.log(error);
        }
      }
    );
  }
}
