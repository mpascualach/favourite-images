import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageDetailComponent } from './image-detail/image-detail.component';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {
  @Input() images: any[] = [];
  selectedImage: any;

  @ViewChild(ImageDetailComponent) imageDetail!: ImageDetailComponent;

  @Output() imagesChanged = new EventEmitter<void>();

  openModal(image: any) {
    this.selectedImage = image;
    this.imageDetail.openModal();
  }

  fetchImages() {
    this.imagesChanged.emit();
  }
}
