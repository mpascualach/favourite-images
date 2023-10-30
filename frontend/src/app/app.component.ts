import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageService } from './services/image.service';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @ViewChild(ImageUploaderComponent) imageUploader!: ImageUploaderComponent;
  images: any[] = [];
  firstTime: boolean = true;

  constructor(private http: HttpClient, private imageService: ImageService) {}

  ngOnInit(): void {
    this.fetchImages();
  }

  fetchImages(): void {
    this.imageService.fetchImages().subscribe(
      (images) => {
        this.images = images;
        console.log(images);
        if (images.length === 0 && this.firstTime) {
          this.imageUploader.openModal();
          this.firstTime = false;
        }
      },
      (error) => {
        console.error('Failed to fetch images:', error);
      }
    );
  }
}
