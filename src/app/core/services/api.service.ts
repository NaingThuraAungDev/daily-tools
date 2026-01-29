import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  public constructor(private readonly http: HttpClient) {}

  public get<T>(endpoint: string, options?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, options);
  }

  public post<T>(endpoint: string, body: any, options?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, options);
  }

  public put<T>(endpoint: string, body: any, options?: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, options);
  }

  public delete<T>(endpoint: string, options?: any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, options);
  }

  public patch<T>(endpoint: string, body: any, options?: any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, body, options);
  }
}
