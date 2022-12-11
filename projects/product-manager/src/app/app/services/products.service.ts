import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    const url = 'https://frontend-tech-test-data.s3-eu-west-1.amazonaws.com/items.json';
    return this.http.get<any>(url).pipe(map((data: any) => data.items));
  }
}
