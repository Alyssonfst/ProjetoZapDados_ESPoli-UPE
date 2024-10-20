// carregar-arquivo.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carregar-arquivo',
  templateUrl: './carregar-arquivo.component.html',
  styleUrls: ['./carregar-arquivo.component.css'],
})

export class CarregarArquivoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file);
      // Aqui você pode adicionar a lógica para lidar com o arquivo
    }
  }
}
