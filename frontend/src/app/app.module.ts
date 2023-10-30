import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { ImageDetailComponent } from './image-gallery/image-detail/image-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageUploaderComponent,
    ImageGalleryComponent,
    ImageDetailComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
