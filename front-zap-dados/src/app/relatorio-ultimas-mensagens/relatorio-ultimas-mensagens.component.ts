import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-relatorio-ultimas-mensagens',
  templateUrl: './relatorio-ultimas-mensagens.component.html',
  styleUrls: ['./relatorio-ultimas-mensagens.component.css']
})
export class RelatorioUltimasMensagensComponent implements OnInit {

  usuarios: any[] = [];
  filteredUsers: any[] = [];
  selectedUser: string = '';
  searchTerm: string = '';
  filteredUsersList: string[] = [];
  uniqueUsers: string[] = [];

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.carregarUsuarios()
    this.extractUniqueUsers()
  }

  carregarUsuarios(): void {
    this.http.get<any[]>(`${this.apiUrl}api/tempo/obter-tempo-uso`).subscribe(
      (data) => {
        console.log('Dados carregados:', data);
        this.usuarios = data;
        this.filteredUsers = data;
        this.extractUniqueUsers();
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }
  
  extractUniqueUsers(): void {
    const usernamesSet = new Set<string>();
    this.usuarios.forEach(usuario => {
      if (usuario.username) {
        usernamesSet.add(usuario.username);
      } else {
        console.warn('Usuário sem nome detectado:', usuario);
      }
    });
    this.uniqueUsers = Array.from(usernamesSet);
  }

  handleFilterChange(username: string): void {
    this.selectedUser = username;
    this.filteredUsers = username === '' ? this.usuarios : this.usuarios.filter(usuario => usuario.username === username);
  }

  handleSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filteredUsers = !searchTerm
      ? this.usuarios
      : this.usuarios.filter(usuario => usuario.username.toLowerCase().includes(searchTerm.toLowerCase()));
    this.uniqueUsers = Array.from(new Set(this.filteredUsers.map(usuario => usuario.username)));
  }
}