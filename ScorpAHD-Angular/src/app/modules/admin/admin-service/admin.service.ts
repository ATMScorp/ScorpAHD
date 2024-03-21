import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addStudent(studentDto: any) {
    return this.http.post<any>(BASIC_URL + "admin/student", studentDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllStudents(): Observable<any> {
    return this.http.get<any>(BASIC_URL + "admin/dashboard", {
      headers: this.createAuthorizationHeader(),
    })
  }

  getStudentById(studentId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}admin/dashboard/${studentId}`, {
      headers: this.createAuthorizationHeader(),
    })
  }

  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete<any>(`${BASIC_URL}admin/dashboard/${studentId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateStudent(studentId: number, studentDto: any) {
    return this.http.post<any>(`${BASIC_URL}admin/dashboard/update/${studentId}`, studentDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader(): HttpHeaders {
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
