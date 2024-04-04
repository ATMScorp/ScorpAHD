import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  events: any[] = [];
  eventForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllEvents();
    this.initEventForm(); 
  }

  getAllEvents() {
    this.service.getAllEvents().subscribe((res) => {
      console.log(res);
      this.events = res;
    })
  }

  initEventForm() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.isSubmitting = true;
      const eventDto = this.eventForm.value;
      this.service.addEvent(eventDto).subscribe({
        next: (response) => {
          console.log('Event added successfully:', response);
          this.isSubmitting = false;
          this.snackBar.open('Event added successfully!', 'Close', { duration: 3000 });
          this.getAllEvents();
          this.eventForm.reset();
        },
        error: (error) => {
          console.error('Failed to add event:', error);
          this.isSubmitting = false;
          this.snackBar.open('Failed to add event. Please try again later.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  deleteEvent(eventId: number): void {
    this.service.deleteEvent(eventId).subscribe({
      next: () => {
        console.log('Event deleted successfully');
        this.snackBar.open('Event deleted successfully!', 'Close', { duration: 3000 });
        this.getAllEvents();
      },
      error: (error) => {
        console.error('Failed to delete event:', error);
        this.snackBar.open('Failed to delete event. Please try again later.', 'Close', { duration: 3000 });
      }
    });
  }
}
