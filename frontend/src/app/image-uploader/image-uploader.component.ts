import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent {
  @ViewChild('modal') modal!: ElementRef;

  imageUrl: string | ArrayBuffer | null = null;
  selectedFile!: File;
  imageTitle: string = '';

  @Output() imageUploaded = new EventEmitter<void>();

  constructor(private http: HttpClient, private imageService: ImageService) {}

  onFileSelected(event: Event): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (file) {
      console.log(file);
      const reader = new FileReader();
      reader.onload = () => (this.imageUrl = reader.result);
      reader.readAsDataURL(file);

      if (!this.imageTitle) {
        this.imageTitle = file.name.replace(/\.[^/.]+$/, '');
      }

      this.selectedFile = file;
    }
  }

  async onUpload(): Promise<void> {
    if (!this.selectedFile || !this.imageTitle) {
      console.error('Selected file or image title is missing');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('title', this.imageTitle);

    this.imageService.uploadImage(formData).subscribe((res) => {
      console.log('Image uploaded successfully!', res);
      this.imageUploaded.emit();
      this.closeModal();
    });
  }

  openModal(): void {
    this.modal.nativeElement.showModal();
  }

  closeModal(): void {
    this.modal.nativeElement.close();
  }
}
