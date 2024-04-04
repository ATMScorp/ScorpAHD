import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable, catchError } from 'rxjs';

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

  sendMail(to: string, cc: string | null, subject: string, body: string, attachments: File[] | null): Observable<any> {
    const headers = this.createAuthorizationHeader();
    const formData = new FormData();
    formData.append('to', to);
    
    if (cc && typeof cc === 'string') {
      formData.append('cc', cc);
    } else if (cc && Array.isArray(cc)) {
      cc.forEach((ccItem: string) => {
        formData.append('cc', ccItem);
      });
    }
    
    formData.append('subject', subject);
    formData.append('body', body);
  
    if (attachments) {
      attachments.forEach((file: File) => {
        formData.append('files', file);
      });
    }
  
    return this.http.post<any>(BASIC_URL + "admin/send", formData, { headers });
  }
  
  sendMailToAll(subject: string, body: string, attachments: File[] | null): Observable<any> {
    const headers = this.createAuthorizationHeader();
    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('body', body);
  
    if (attachments) {
      attachments.forEach((file: File) => {
        formData.append('files', file);
      });
    }
  
    return this.http.post<any>(BASIC_URL + "admin/send/send-to-all", formData, { headers });
  }

  addEvent(eventDto: any): Observable<any> {
    return this.http.post<any>(BASIC_URL + "admin/event", eventDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllEvents(): Observable<any> {
    return this.http.get<any>(BASIC_URL + "admin/events", {
      headers: this.createAuthorizationHeader(),
    });
  }

  getEventById(eventId: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}admin/event/${eventId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${BASIC_URL}admin/event/${eventId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateEvent(eventId: number, eventDto: any): Observable<any> {
    return this.http.put<any>(`${BASIC_URL}admin/event/${eventId}`, eventDto, {
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
