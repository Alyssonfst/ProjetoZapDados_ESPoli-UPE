import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-relatorio-ultimas-mensagens',
  templateUrl: './relatorio-ultimas-mensagens.component.html',
  styleUrls: ['./relatorio-ultimas-mensagens.component.css'],
})
export class RelatorioUltimasMensagensComponent implements OnInit {
  usuarios: any[] = [];
  filteredUsers: any[] = [];
  selectedUser: string = '';
  searchTerm: string = '';
  uniqueUsers: string[] = [];
  last30DaysMessages: any[] = [];
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarUsuarios();
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
    this.usuarios.forEach((usuario) => {
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
    this.filteredUsers =
      username === ''
        ? this.usuarios
        : this.usuarios.filter((usuario) => usuario.username === username);
    this.getLast30DaysMessages();
  }

  handleSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filteredUsers = !searchTerm
      ? this.usuarios
      : this.usuarios.filter((usuario) =>
          usuario.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    this.uniqueUsers = Array.from(
      new Set(this.filteredUsers.map((usuario) => usuario.username))
    );
  }

  getLast30DaysMessages(): void {
    if (!this.selectedUser) {
      return;
    }

    const user = this.usuarios.find(
      (usuario) => usuario.username === this.selectedUser
    );
    if (!user || !user.temposUso) {
      this.last30DaysMessages = [];
      return;
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    this.last30DaysMessages = user.temposUso
      .filter((tempoUso: any) => {
        const messageDate = new Date(
          tempoUso.ano,
          tempoUso.mes - 1,
          tempoUso.dia
        );
        return messageDate >= thirtyDaysAgo;
      })
      .map((tempoUso: any) => ({
        data: new Date(
          tempoUso.ano,
          tempoUso.mes - 1,
          tempoUso.dia,
          tempoUso.horaDoDia
        ),
        mensagens: tempoUso.mensagens,
      }))
      .sort((a: any, b: any) => b.data.getTime() - a.data.getTime());
  }

  exportToPDF(): void {
    const doc = new jsPDF();

    //fonte e tamanho
    doc.setFontSize(16);
    doc.text(`Relatório de Mensagens - ${this.selectedUser}`, 10, 10);

    let yOffset = 20; // Posição inicial

    // Itera sobre as mensagens dos últimos 30 dias
    this.last30DaysMessages.forEach((message, index) => {
      doc.setFontSize(12);
      const date =
        message.data.toLocaleDateString() +
        ' ' +
        message.data.toLocaleTimeString();

      message.mensagens.forEach((texto: string) => {
        // criar uma nova página
        if (yOffset > 250) {
          doc.addPage();
          yOffset = 20;
        }

        doc.setFontSize(12);
        doc.text(`${date}`, 10, yOffset);
        yOffset += 10;

        // Quebra o texto para caber na largura da página
        const lines = doc.splitTextToSize(`"${texto}"`, 180);

        // Adiciona as linhas quebradas ao PDF
        lines.forEach((line: string) => {
          doc.text(line, 15, yOffset);
          yOffset += 10;
        });

        yOffset += 5;
      });
    });

    doc.save(`Mensagens_${this.selectedUser}.pdf`);
  }
}
