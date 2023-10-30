import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  fetchImages(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/gallery');
  }

  uploadImage(formData: FormData) {
    return this.http.post('http://localhost:3000/upload', formData);
  }

  updateImage(id: number, title: string): Observable<any> {
    return this.http.patch('http://localhost:3000/update/' + id, { title });
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/delete/' + id);
  }
}
