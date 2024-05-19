import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { StudentService } from './modules/student/student-service/student.service';
import { AdminService } from './modules/admin/admin-service/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ScorpAHD-Angular';

  isAdminLoggedIn: boolean;
  isStudentLoggedIn: boolean;
  eventCounter: number = 0;

  constructor(
    private router: Router,
    private studentService: StudentService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserLoggedStatus();
      }
    })
  }

  private updateUserLoggedStatus(): void {
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isStudentLoggedIn = StorageService.isStudentLoggedIn();
    if (this.isStudentLoggedIn) {
      this.getEvents();
    } else {
      this.eventCounter = 0;
    }
  }

  logout() {
    StorageService.logout();
    this.updateUserLoggedStatus();
    this.router.navigateByUrl("/login");
  }

  getEvents(): void {
    this.studentService.getEventsForStudent().subscribe({
      next: (response) => {
        this.eventCounter = response.length;
      },
      error: (error) => {
        console.error("Error fetching events:", error);
      }
    });
  }

  exportToExcel(): void {
    this.adminService.exportStudentsToExcel().subscribe({
      next: (data: Blob) => {
        saveAs(data, 'students.xlsx');
      },
      error: (error: any) => {
        console.error('Error exporting students to Excel:', error);
      }
    });
  }

  scrollToPage(sectionName: string) {
    let sectionElement: HTMLElement | null = null;

    if (sectionName === 'about') {
      sectionElement = document.getElementById('about');
    } else if (sectionName === 'info') {
      sectionElement = document.getElementById('info')
    } else if (sectionName === 'contact') {
      sectionElement = document.getElementById('contact');
    } 
    
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
