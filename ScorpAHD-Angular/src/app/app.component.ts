import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { NavigationEnd, Router } from '@angular/router';
import { StudentService } from './modules/student/student-service/student.service';

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
    private studentService: StudentService
  ){}

  ngOnInit(){
    this.updateUserLoggedStatus();
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
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

  logout(){
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
}
