// carregar-arquivo.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileUploadService } from '../file-upload.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-carregar-arquivo',
  templateUrl: './carregar-arquivo.component.html',
  styleUrls: ['./carregar-arquivo.component.css'],
})
export class CarregarArquivoComponent implements OnInit {
  message: string | null = null;
  showModal: boolean = false; // Controla a exibição do modal
  Success: boolean = false; // Determina se o upload foi bem-sucedido

  private apiUrl = environment.apiUrl;

  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private fileUploadService: FileUploadService,
    private router: Router // Injeção do Router
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file);
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'txt') {
        this.message = 'Arquivo selecionado com sucesso!';
        this.selectedFile = file;
        this.onUpload();
      } else {
        this.message = 'Por favor, selecione um arquivo .txt';
      }
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http
        .post(environment.apiUrl + 'api/upload/txt-file', formData)
        .subscribe(
          (response) => {
            console.log('Upload bem-sucedido:', response);
            this.message =
              'Upload realizado com sucesso! Agora você pode navegar pelos relatórios';
            this.Success = true;
            this.fileUploadService.setFileUploaded(true); // Chamando o método do serviço corretamente
          },
          (error: HttpErrorResponse) => {
            console.error('Erro ao enviar o arquivo:', error);
            this.message =
              'Erro ao enviar o arquivo! Atualize a página e tente novamente.';
            this.Success = false;
          }
        );
    } else {
      this.message = 'Nenhum arquivo selecionado para upload.';
      this.Success = false;
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  goToReports(): void {
    this.router.navigate(['/reports']);
    this.closeModal();
  }
}
