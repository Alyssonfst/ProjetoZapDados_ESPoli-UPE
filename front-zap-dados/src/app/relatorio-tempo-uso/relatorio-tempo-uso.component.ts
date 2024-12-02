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
    
  dayOfWeekMap: { [key: string]: string } = {
      MONDAY: 'Segunda-feira',
      TUESDAY: 'Terça-feira',
      WEDNESDAY: 'Quarta-feira',
      THURSDAY: 'Quinta-feira',
      FRIDAY: 'Sexta-feira',
      SATURDAY: 'Sábado',
      SUNDAY: 'Domingo',
    };
    
  dayOfWeekChartLabels = Object.values(this.dayOfWeekMap);
  imagem: string = environment.production ? '/front-zap-dados/assets/ZAPDADOS_fundobranco_slogan.png' : '../../assets/ZAPDADOS_fundobranco_slogan.png';

  errorExtractUser: boolean = false;
  errorFilterUser: boolean = false;
  errorChart: boolean = false;

  messageErrorChart: string = '';
  messageErrorFilter: string = '';
  messageErrorExtract: string = '';

  chartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  };
  
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
        this.atualizarGraficosAll();
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
    if (username === 'all') {
      this.filteredUsers = this.usuarios
      this.atualizarGraficosAll()
    }
    
    else {
      this.filteredUsers = this.usuarios.filter(usuario => usuario.username === username);
      this.atualizarGraficos();
    }
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
  

  atualizarGraficosAll(): void {

    this.errorChart = false
    this.messageErrorChart = '';

    try {

      const userActivity = this.usuarios.map(usuario => ({
        username: usuario.username,
        totalMessages: usuario.temposUso.reduce((sum: number, tempo: any) => sum + tempo.qntMensagens, 0)
      }));
  
      userActivity.sort((a, b) => b.totalMessages - a.totalMessages);
  
      const topUsers = userActivity.slice(0, 10);
      const others = userActivity.slice(10);
  
      // Dados para os 10 mais ativos
      const topUsersData = topUsers.map(user => ({
        data: Array(24).fill(0),
        label: user.username,
        backgroundColor: this.gerarCorAleatoria(),
      }));
  
      // Dados para os outros
      const othersData = {
        data: Array(24).fill(0),
        label: 'Outros',
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
      };
  
      this.usuarios.forEach(usuario => {
        const targetData =
          topUsers.some(user => user.username === usuario.username)
            ? topUsersData.find(data => data.label === usuario.username)
            : othersData;
  
        if (targetData) {
          usuario.temposUso.forEach((tempo: any) => {
            if (tempo.horaDoDia >= 0 && tempo.horaDoDia < 24) {
              targetData.data[tempo.horaDoDia] += tempo.qntMensagens;
            }
          });
        }
      });
  
      // Atualiza os gráficos
      this.timeOfDayChartData = [...topUsersData, othersData];
      this.dayOfWeekChartData = this.generateDayOfWeekData(topUsers, others);
  
    } catch (error) {
      console.error('Erro ao atualizar gráficos:', error);
      this.errorChart = true;
      this.messageErrorChart = 'Erro ao atualizar gráficos. Por favor, verifique seu arquivo e tente novamente.';
    }
  }
  
  generateDayOfWeekData(topUsers: any[], others: any): any[] {
    const topUsersDayData = topUsers.map(user => ({
      data: Object.keys(this.dayOfWeekMap).map(diaIngles => {
        const usuario = this.usuarios.find(u => u.username === user.username);
        return usuario
          ? usuario.temposUso
              .filter((tempo: any) => tempo.diaSemana.toUpperCase() === diaIngles)
              .reduce((sum: number, tempo: any) => sum + tempo.qntMensagens, 0)
          : 0;
      }),
      label: user.username,
      backgroundColor: this.gerarCorAleatoria(),
    }));
  
    const othersDayData = {
      data: Object.keys(this.dayOfWeekMap).map(diaIngles => {
        return others.reduce((sum: any, user: any) => {
          const usuario = this.usuarios.find(u => u.username === user.username);
          return sum + (usuario
            ? usuario.temposUso
                .filter((tempo: any) => tempo.diaSemana.toUpperCase() === diaIngles)
                .reduce((sum: number, tempo: any) => sum + tempo.qntMensagens, 0)
            : 0);
        }, 0);
      }),
      label: 'Outros',
      backgroundColor: 'rgba(200, 200, 200, 0.5)',
    };
  
    return [...topUsersDayData, othersDayData];
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
