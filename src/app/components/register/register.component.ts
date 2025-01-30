import { Component, effect, input, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppMaterialModule } from '../../ang-material/app-material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../services/httpService/http.service';
import { AuthService } from '../../services/auth/auth.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'work-time-register',
  imports: [
    FormsModule,
    AppMaterialModule,
    NgIf,
    RouterLink,
    AvatarComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) {
    effect(() => {
      if(this.userId() !=null) {
        this.httpService.get('user/'+this.userId()).subscribe({
          next: (data) => {
            this.form = data;
        },
      error: (err) => {
            console.log('error');
            console.log(err);
      }
        })
      }
    })
  }

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  formUpload = new FormData();
  form:any = {};
  userId = input(null);
  // fileSignal = signal(null);
file:any;
  protected hidePassword = true;

  public onSubmit(form :any) {
    if(this.userId()) {
      this.httpService.save('/user/add', this.form).subscribe(
        res => {
          console.log(res);
          this._snackBar.open('User data updated!', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['successSnackBar']
          });
          this.router.navigate(['/home'])
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.formUpload = new FormData();
      this.formUpload.append('firstName',this.form.firstName);
      this.formUpload.append('lastName',this.form.lastName);
      this.formUpload.append('email',this.form.email);
      this.formUpload.append('password',this.form.password);
      this.formUpload.append('picture',this.file);

      debugger;
      this.authService.register(this.formUpload).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this._snackBar.open('Registration successful!', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['successSnackBar']
          });

          this.router.navigate(['/login']);
        },
        err => {
          this._snackBar.open('Registration failed!', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['warningSnackBar']
          });

          this.errorMessage = err.error.message;
          if(this.errorMessage.includes('Username')) {
            form.form.controls['username'].setErrors({'incorrect': true});
          }
          if(this.errorMessage.includes('Email')) {
            form.form.controls['email'].setErrors({'incorrect': true});
          }
          this.isSignUpFailed = true;
        }
      );
    }

  }

  onFileChanged(file:any) {
    this.file = file;
  }
}
