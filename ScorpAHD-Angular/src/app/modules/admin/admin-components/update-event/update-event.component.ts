import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  eventForm: FormGroup;
  isSubmitting: boolean = false;
  eventId: number = this.activatedRoute.snapshot.params['eventId'];
  isSpinning: boolean;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private service: AdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      photoUrl: ['']
    });
    this.getEventById();
  }

  getEventById() {
    this.service.getEventById(this.eventId).subscribe((res) => {
      const eventDto = res.eventDto;
      this.eventForm.patchValue(eventDto);
      console.log(res);
    });
  }
  

  updateEvent() {
    this.service.updateEvent(this.eventId, this.eventForm.value).subscribe(
      (res) => {
        console.log(res);
        if (res.id != null) {
          this.snackBar.open("Event updated successfully.", "Close", { duration: 5000 });
        } else {
          this.snackBar.open("Event not found.", "Close", { duration: 5000 });
        }
      }
    )
  }
}
