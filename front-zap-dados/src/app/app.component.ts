import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zap Dados';
  //isMenuEnabled: boolean = true;

  constructor(private authService: AuthService, private router: Router, private fileUploadService: FileUploadService) {}

  logout(): void {
    this.authService.logout();
    this.fileUploadService.setFileUploaded(false);
    this.router.navigate(['/login']);
    console.log('chamou logout');
    //this.isMenuEnabled = false;
  }

  isMenuEnabled(): boolean {
    return sessionStorage.getItem('isLoggedIn') != null && sessionStorage.getItem('isLoggedIn') === 'true';
  }

  isReportsVisible(): boolean {
    return sessionStorage.getItem('isLoggedIn') != null && sessionStorage.getItem('isLoggedIn') === 'true' 
        && this.fileUploadService.isFileUploaded();
  }
}
