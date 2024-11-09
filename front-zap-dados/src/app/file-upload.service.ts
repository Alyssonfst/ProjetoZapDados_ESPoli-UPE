import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private fileUploaded: boolean = false;

  constructor() {}

  setFileUploaded(uploaded: boolean): void {
    this.fileUploaded = uploaded;
  }

  isFileUploaded(): boolean {
    return this.fileUploaded;
  }
}
