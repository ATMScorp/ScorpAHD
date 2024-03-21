import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(BASIC_URL + '/login', { email, password }, { observe: 'response' })
      .pipe(
        tap(__ => this.log("User Authentication")),
        map(res => {
          this.handleAuthentication(res);
          return res;
        })
      );
  }

  private handleAuthentication(response: any): void {
    const token = response.headers.get('Authorization');
    this.storage.saveToken(token);
    this.storage.saveUser(response.body);
  }

  private log(message: string): void {
    console.log(message);
  }
}


