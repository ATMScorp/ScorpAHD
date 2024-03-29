import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.scss']
})
export class SendMailComponent implements OnInit {
  validateForm: FormGroup;
  isSpinning: boolean = false;
  sendToAll: boolean = false;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      to: [null, Validators.email],
      cc: [null, Validators.email],
      subject: [null, Validators.required],
      body: [null, Validators.required],
      sendToAll: [false]
    });
  }

  onSubmit(): void {
    if (this.validateForm.valid) {
      this.isSpinning = true;
      const { to, cc, subject, body, sendToAll } = this.validateForm.value;
      if (sendToAll) {
        this.adminService.sendMailToAll(subject, body, this.selectedFiles).subscribe({
          next: (response) => {
            console.log('Mail sent to all users successfully:', response);
            this.isSpinning = false;
            this.snackBar.open('Mail sent to all users successfully!', 'Close', { duration: 3000 });
            this.resetForm();
          },
          error: (error) => {
            console.error('Error sending mail to all users:', error);
            this.isSpinning = false;
            this.snackBar.open('Failed to send mail to all users. Please try again later.', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.adminService.sendMail(to, cc, subject, body, this.selectedFiles).subscribe({
          next: (response) => {
            console.log('Mail sent successfully:', response);
            this.isSpinning = false;
            this.snackBar.open('Mail sent successfully!', 'Close', { duration: 3000 });
            this.resetForm();
          },
          error: (error) => {
            console.error('Error sending mail:', error);
            this.isSpinning = false;
            this.snackBar.open('Failed to send mail. Please try again later.', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  resetForm(): void {
    this.validateForm.reset();
    this.selectedFiles = [];
  }
}