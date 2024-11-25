import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  uniqueUsers: string[] = [];
  last30DaysMessages: any[] = [];
  apiUrl = environment.apiUrl;

  erroExtractUser: boolean = false;
  erroFilterUser: boolean = false;
  erroExtractMessages: boolean = false;
  mensagemErro: string = '';
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  downloadAsPDF() {
    const element = document.getElementById('contentToDownload');
    if (!element) return;
  
    const fileName = prompt('Digite o nome do arquivo:', 'relatorio-mensagens');
    if (!fileName) return;
  
    html2canvas(element).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4: 210mm x 297mm
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Largura do PDF
      const pdfHeight = pdf.internal.pageSize.getHeight(); // Altura do PDF
  
      const imgWidth = canvas.width; // Largura da imagem do canvas
      const imgHeight = canvas.height; // Altura da imagem do canvas
  
      // Ajustar proporção para priorizar largura
      const scale = pdfWidth / imgWidth; 
      const imgScaledWidth = pdfWidth; // Forçar a largura do PDF
      const imgScaledHeight = imgHeight * scale; // Escalar altura proporcionalmente
  
      const imgData = canvas.toDataURL('image/png');
  
      // Verificar se a altura extrapola o PDF e ajustar:
      const yOffset = imgScaledHeight > pdfHeight ? 0 : (pdfHeight - imgScaledHeight) / 2;
  
      pdf.addImage(
        imgData,
        'PNG',
        0, // Início horizontal (0: alinhar à esquerda)
        yOffset, // Centralizar verticalmente, se couber
        imgScaledWidth,
        imgScaledHeight
      );
  
      pdf.save(`${fileName}.pdf`);
    });
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
    this.erroExtractUser = false;
    this.mensagemErro = '';

    try{
      const usernamesSet = new Set<string>();
      this.usuarios.forEach(usuario => {
        if (usuario.username) {
          usernamesSet.add(usuario.username);
        } else {
          console.warn('Usuário sem nome detectado:', usuario);
        }
      });
      this.uniqueUsers = Array.from(usernamesSet);
      } catch (error) {
        console.error('Erro ao extrair usuários únicos:', error);
        this.erroExtractUser = true;
        this.mensagemErro = 'Erro ao extrair usuários únicos. Por favor, verifique seu arquivo e tente novamente.';
      }
  }

  handleFilterChange(username: string): void {
    this.selectedUser = username;
    this.filteredUsers = username === '' ? this.usuarios : this.usuarios.filter(usuario => usuario.username === username);
    this.getLast30DaysMessages();
  }

  handleSearch(searchTerm: string): void {
    try {
    this.searchTerm = searchTerm;
    this.filteredUsers = !searchTerm
      ? this.usuarios
      : this.usuarios.filter(usuario => usuario.username.toLowerCase().includes(searchTerm.toLowerCase()));
    this.uniqueUsers = Array.from(new Set(this.filteredUsers.map(usuario => usuario.username)));
    } catch (error) {
      console.error('Erro ao filtrar usuários:', error);
      this.erroFilterUser = true;
      this.mensagemErro = 'Erro ao filtrar usuários. Por favor, verifique seu arquivo e tente novamente.';  
    }
  }

  getLast30DaysMessages(): void {
    this.erroExtractMessages = false;
    
    try {
      if (!this.selectedUser) {
        return;
      }
  
      const user = this.usuarios.find(usuario => usuario.username === this.selectedUser);
      if (!user || !user.temposUso) {
        this.last30DaysMessages = [];
        return;
      }
  
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
      this.last30DaysMessages = user.temposUso
        .filter((tempoUso: any) => {
          const messageDate = new Date(tempoUso.ano, tempoUso.mes - 1, tempoUso.dia);
          return messageDate >= thirtyDaysAgo;
        })
        .map((tempoUso: any) => ({
          data: new Date(tempoUso.ano, tempoUso.mes - 1, tempoUso.dia, tempoUso.horaDoDia),
          mensagens: tempoUso.mensagens
        }))
        .sort((a: any, b: any) => b.data.getTime() - a.data.getTime());
    } catch (error) {
      console.error('Erro ao obter mensagens dos últimos 30 dias:', error);
      this.erroExtractMessages = true;
      this.mensagemErro = 'Erro ao obter mensagens dos últimos 30 dias. Por favor, verifique seu arquivo e tente novamente.';
    }
  }
}
