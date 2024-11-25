import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio-tempo-uso',
  templateUrl: './relatorio-tempo-uso.component.html',
  styleUrls: ['./relatorio-tempo-uso.component.css']
})
export class RelatorioTempoUsoComponent implements OnInit {
  usuarios: any[] = [];
  timeOfDayChartData: any[] = [];
  dayOfWeekChartData: any[] = [];

  filteredUsers: any[] = [];
  selectedUser: string = 'all';
  searchTerm: string = '';
  filteredUsersList: string[] = [];
  uniqueUsers: string[] = [];

  timeOfDayChartLabels = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
    '22:00', '23:00'];
    
  dayOfWeekChartLabels = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  imagem: string = environment.production ? '/front-zap-dados/assets/ZAPDADOS_fundobranco_slogan.png' : '../../assets/ZAPDADOS_fundobranco_slogan.png';

  errorExtractUser: boolean = false;
  errorFilterUser: boolean = false;
  errorChart: boolean = false;

  messageErrorChart: string = '';
  messageErrorFilter: string = '';
  messageErrorExtract: string = '';

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  downloadAsPDF() {
    const element = document.getElementById('contentToDownload');
    if (!element) return;
  
    const fileName = prompt('Digite o nome do arquivo:', 'relatorio-tempo-uso');
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
        this.atualizarGraficos();
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  extractUniqueUsers(): void {
    const usernamesSet = new Set<string>();
    this.errorExtractUser = false;
    this.messageErrorChart = ''
    try {
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
      this.errorExtractUser = true;
      this.messageErrorExtract = 'Erro ao extrair usuários únicos. Por favor, verifique seu arquivo e tente novamente.';
    }
  }

  handleFilterChange(username: string): void {
    this.selectedUser = username;
    this.filteredUsers = username === 'all' ? this.usuarios : this.usuarios.filter(usuario => usuario.username === username);
    this.atualizarGraficos();
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
    }
  }
  

  atualizarGraficos(): void {

    this.errorChart = false
    this.messageErrorChart = '';

    try {
      
    if (this.selectedUser === 'all') {

      this.timeOfDayChartData = [{
        data: Array(24).fill(0),
        label: 'Todos os Usuários',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }];
      
      this.dayOfWeekChartData = [{
        data: Array(7).fill(0),
        label: 'Todos os Usuários',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }];

      // Soma os dados de todos os usuários
      this.usuarios.forEach(usuario => {
        usuario.temposUso.forEach((tempo: any) => {
          if (tempo.horaDoDia >= 0 && tempo.horaDoDia < 24) {
            this.timeOfDayChartData[0].data[tempo.horaDoDia] += tempo.qntMensagens;
          }
          const diaIndex = this.dayOfWeekChartLabels.indexOf(tempo.diaSemana.toUpperCase());
          if (diaIndex !== -1) {
            this.dayOfWeekChartData[0].data[diaIndex] += tempo.qntMensagens;
          }
        });
      });

    } else {
      // Usuario específico
      const usuarioSelecionado = this.usuarios.find(usuario => usuario.username === this.selectedUser);
      this.timeOfDayChartData = this.filteredUsers.map(usuario => {
        const timeOfDayData = Array(24).fill(0);
        usuario.temposUso.forEach((tempo: any) => {
          if (tempo.horaDoDia >= 0 && tempo.horaDoDia < 24) {
            timeOfDayData[tempo.horaDoDia] += tempo.qntMensagens;
          }
        });

        return {
          data: timeOfDayData,
          label: usuario.username,
          backgroundColor: this.gerarCorAleatoria(),
        };
      });

      this.dayOfWeekChartData = this.filteredUsers.map(usuario => {
        const dayOfWeekData = this.dayOfWeekChartLabels.map(dia => {
          return usuario.temposUso
            .filter((tempo: any) => tempo.diaSemana === dia)
            .reduce((sum: number, tempo: any) => sum + tempo.qntMensagens, 0);
        });

        return {
          data: dayOfWeekData,
          label: usuario.username,
          backgroundColor: this.gerarCorAleatoria(),
        };
      });
    }
  } catch (error) {
    console.error('Erro ao atualizar gráficos:', error);
    this.errorChart = true;
    this.messageErrorChart = 'Erro ao atualizar gráficos. Por favor, verifique seu arquivo e tente novamente.';
  }
}



  gerarCorAleatoria(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}
