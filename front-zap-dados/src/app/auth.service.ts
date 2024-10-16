import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  

  constructor(private router: Router, private http: HttpClient) { }
/*
  login(username: string, password: string): boolean {
    if ( username === 'admin' && password === 'admin') {
      sessionStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }
    */
  private apiUrl = 'http://localhost:8080/login/login'; 

  login(username: string, password: string): Observable<any> {
    const body = { username, password }; // Criando o corpo da requisição
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, body, { headers });
  }

  logout(): void {
    sessionStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('isLoggedIn') != null && sessionStorage.getItem('isLoggedIn') === 'true';
  }
}
