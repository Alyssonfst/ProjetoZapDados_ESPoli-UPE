// carregar-arquivo.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carregar-arquivo',
  templateUrl: './carregar-arquivo.component.html',
  styleUrls: ['./carregar-arquivo.component.css'],
})

export class CarregarArquivoComponent implements OnInit {

  message: string | null = null;

  private apiUrl = environment.apiUrl; 
  
  selectedFile: File | null = null
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file);
      // Aqui você pode adicionar a lógica para lidar com o arquivo
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension === 'txt') {
        this.message = 'Arquivo selecionado com sucesso!';
        this.selectedFile = file


      } else {
        this.message = 'Por favor, selecione um arquivo .txt';
      }
    }
  }

  onUpload(): void {

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post(environment.apiUrl+'/api/upload/upload', formData).subscribe(
        (response) => {
          console.log('Upload bem-sucedido:', response);
          this.message = 'Upload realizado com sucesso!';
        },
        (error: HttpErrorResponse) => {
          console.error('Erro ao enviar o arquivo:', error);
          this.message = 'Erro ao enviar o arquivo!';
        }
      );
    } else {
      this.message = 'Nenhum arquivo selecionado para upload.';
    }
  }
}
