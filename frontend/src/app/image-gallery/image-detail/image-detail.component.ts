import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
})
export class ImageDetailComponent {
  @Input() currentImage: any;

  @Output() imagesChanged = new EventEmitter<void>();
  @ViewChild('modal') modal!: ElementRef;

  constructor(private imageService: ImageService) {}

  openModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.modal.nativeElement.close();
  }

  updateImage() {
    this.imageService
      .updateImage(this.currentImage.id, this.currentImage.title)
      .subscribe((res: any) => {
        console.log('Image updated successfully!', res);
        this.imagesChanged.emit();
        this.closeModal();
      });
  }

  deleteImage() {
    this.imageService
      .deleteImage(this.currentImage.id)
      .subscribe((res: any) => {
        console.log('Image deleted successfully!', res);
        this.imagesChanged.emit();
        this.closeModal();
      });
  }
}
