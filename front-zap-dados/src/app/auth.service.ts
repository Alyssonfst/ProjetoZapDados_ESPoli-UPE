import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    if ( username === 'admin' && password === 'admin') {
      sessionStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('isLoggedIn') != null && sessionStorage.getItem('isLoggedIn') === 'true';
  }
}
