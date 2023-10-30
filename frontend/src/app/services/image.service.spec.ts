import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService],
    });

    service = TestBed.inject(ImageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch images', () => {
    const dummyImages = [{ id: 1, title: 'Image 1', filePath: 'image1.jpg' }];

    service.fetchImages().subscribe((images) => {
      expect(images.length).toBe(1);
      expect(images).toEqual(dummyImages);
    });

    const req = httpMock.expectOne('http://localhost:3000/gallery');
    expect(req.request.method).toBe('GET');
    req.flush(dummyImages);
  });

  it('should upload an image', () => {
    const dummyResponse = { message: 'Image uploaded successfully!' };
    const formData = new FormData();
    formData.append('image', new Blob(), 'test.png');
    formData.append('title', 'Test Image');

    service.uploadImage(formData).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/upload');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should update an image title', () => {
    const dummyResponse = { message: 'Image title updated successfully!' };
    const id = 1;
    const title = 'Updated Title';

    service.updateImage(id, title).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/update/${id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(dummyResponse);
  });

  it('should delete an image', () => {
    const dummyResponse = { message: 'Image deleted successfully!' };
    const id = 1;

    service.deleteImage(id).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/delete/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyResponse);
  });
});
