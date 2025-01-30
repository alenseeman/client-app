import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'work-time-home',
  imports: [MatToolbar, MatIcon],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './user-details.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private tokenService: TokenStorageService,
              private authService: AuthService,
              private router: Router) {
  }

  startLogging() {
    console.log('Logging started');
    // Add your logic for starting time logging
  }

  ngOnInit() {
    // if(this.authService.)
  }

  endLogging() {
    console.log('Logging ended');
    // Add your logic for ending time logging
  }

  pauseStartLogging() {
    console.log('Pause started');
    // Add your logic for starting pause logging
  }

  pauseEndLogging() {
    console.log('Pause ended');
    // Add your logic for ending pause logging
  }

  openTimeList() {
    console.log('Opening time list');
    // Add your logic to navigate to the time list or show it
  }

  logout() {
    console.log('User logged out');
    this.tokenService.signOut();

    this.router.navigate(['/login']);
  }

  arztStart() {
    console.log('Arzt Start');
    // Add your logic for Arzt Start
  }

  arztEnd() {
    console.log('Arzt Ende');
    // Add your logic for Arzt Ende
  }

  dnStart() {
    console.log('DN Start');
    // Add your logic for DN Start
  }

  dnEnd() {
    console.log('DN Ende');
    // Add your logic for DN Ende
  }
  editProfileData() {
    this.router.navigate(['/user/1']);
  }
}
