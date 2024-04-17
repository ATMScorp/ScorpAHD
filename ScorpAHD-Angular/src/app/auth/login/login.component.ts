import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginForm: FormGroup | undefined;
  hidePassword: boolean = true;
  errorMessage: string | undefined;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login(): Subscription {
    return this.service.login(
      this.loginForm.get(['email'])!.value,
      this.loginForm.get(['password'])!.value,
    ).subscribe({
      next: (response) => {
        console.log(response);
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("admin/dashboard");
        } else if (StorageService.isStudentLoggedIn()) {
          this.router.navigateByUrl("student/profile");
        }
      },
      error: (error) => {
        if (error.status == 406) {
          this.snackbar.open("User is not active", "Close", {
            duration: 5000
          });
        } else if (error.status == 401) {
          this.snackbar.open("Invalid email or password", "Close", {
            duration: 5000
          });
        } else {
          this.snackbar.open("Bad credentials", "Close", {
            duration: 5000
          });
        }
      }
    });
  }

  openSnackbar() {
    this.snackbar.open(this.errorMessage, "Close", {
      duration: 5000
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}