import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentById(): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}student/profile/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  updateStudent(studentLeaveDto):Observable<any> {
    return this.http.post<any>(`${BASIC_URL}student/update/${StorageService.getUserId()}`, studentLeaveDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getEventsForStudent(): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}student/news`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();
    if (token) {
      return authHeaders.set('Authorization', "Bearer " + token);
    } else {
      console.error("Token not found!");
      return authHeaders;
    }
  }
}
