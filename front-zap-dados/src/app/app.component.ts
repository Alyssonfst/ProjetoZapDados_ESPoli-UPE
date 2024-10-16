import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zap Dados';
  //isMenuEnabled: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('chamou logout');
    //this.isMenuEnabled = false;
  }

  isMenuEnabled(): boolean {
    return sessionStorage.getItem('isLoggedIn') != null && sessionStorage.getItem('isLoggedIn') === 'true';
  }
}
