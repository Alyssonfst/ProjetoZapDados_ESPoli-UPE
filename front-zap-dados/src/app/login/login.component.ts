import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginError = false;

  imagem: string = environment.production ? '/front-zap-dados/assets/ZAPDADOS_fundobranco_slogan.png' : '../../assets/ZAPDADOS_fundobranco_slogan.png';
  
  constructor(private authService: AuthService, private router: Router) { }

  /*
  onLogin(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
    }
  }*/

    onLogin(): void {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          // Processar a resposta do servidor
          console.log('Login bem-sucedido:', response);
          sessionStorage.setItem('isLoggedIn', 'true');
          // Você pode armazenar tokens ou informações do usuário aqui
          this.router.navigate(['/home']); // Redireciona para a página inicial após o login
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.loginError = true; // Mostra a mensagem de erro
        }
      });
    }

    navigateToIntroducao(): void {
      this.router.navigate(['/introducao']);
    }
}
