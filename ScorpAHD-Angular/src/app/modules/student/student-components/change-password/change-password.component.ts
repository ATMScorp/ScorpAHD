import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student-service/student.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  student: any;
  isSpinning = false;
  validateForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  hideCurrentPassword: boolean = true;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required, this.passwordStrengthValidator]],
      checkPassword: ['', [Validators.required, this.comfirmationValidator]],
    });

    this.validateForm.get('password').valueChanges.subscribe(() => {
      this.validateForm.get('checkPassword').updateValueAndValidity();
    });

    this.getStudentById();
  }

  getStudentById() {
    this.studentService.getStudentById().subscribe((res) => {
      this.student = res;
    })
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  toggleCurrentPasswordVisibility(): void {
    this.hideCurrentPassword = !this.hideCurrentPassword;
  }

  passwordStrengthValidator(control: FormControl): { [key: string]: any } | null {
    const value: string = control.value || '';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;

    if (!value.match(passwordRegex)) {
      return { 'passwordStrength': true };
    }
    return null;
  }

  comfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  getPasswordStrengthColor(): string {
    const passwordControl = this.validateForm.get('password');
    if (!passwordControl.value || passwordControl.hasError('required')) {
      return '';
    }
    const password = passwordControl.value;
    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[@$!%*?&_]/.test(password)) {
      return 'red';
    } else if (password.length < 12) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  getPasswordStrengthHint(): string {
    const passwordControl = this.validateForm.get('password');
    if (!passwordControl.value || passwordControl.hasError('required')) {
      return '';
    }
    const password = passwordControl.value;
    if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[@$!%*?&_]/.test(password)) {
      return 'Weak password';
    } else if (password.length < 12) {
      return 'Medium password';
    } else {
      return 'Strong password';
    }
  }

  changePassword() {
    if (this.validateForm.valid && this.validateForm.value.password == this.validateForm.value.checkPassword) {
      const formData = {
        currentPassword: this.validateForm.value.currentPassword,
        newPassword: this.validateForm.value.password
      };
      this.studentService.changePassword(formData).subscribe({
        next: (res) => {
          if (res.id != null) {
            this.snackBar.open("Password updated successfully.", "Close", { duration: 5000 });
            this.getStudentById();
            this.validateForm.reset();
          } else {
            this.snackBar.open("Student not found.", "Close", { duration: 5000 });
          }
        },
        error: (error) => {
          if (error) {
            this.snackBar.open("Invalid current password. Please enter the correct current password.", "Close", { duration: 5000 });
          } else {
            this.snackBar.open("Something went wrong. Please try again later.", "Close", { duration: 5000 });
          }
        }
      });
    }
  }
  
  
}
