import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'work-time-user-details',
  imports: [MatToolbar, MatIcon, RegisterComponent],
  standalone:true,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent{

  constructor(private tokenService: TokenStorageService,
              private authService: AuthService,
              private router: Router) {
  }
}
