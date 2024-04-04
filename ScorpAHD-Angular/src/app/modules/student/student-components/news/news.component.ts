import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student-service/student.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  events: any[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.studentService.getEventsForStudent().subscribe({
      next: (response) => {
        this.events = response;
      },
      error: (error) => {
        console.error("Error fetching events:", error);
      }
    });
  }  
}
