import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  resetPassword(): void {
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.snackBar.open('Password has been reset successfully.', 'Close', {
          duration: 5000
        });
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Error resetting password:', error);
        this.snackBar.open('Error resetting password.', 'Close', {
          duration: 5000
        });
      }
    });
  }

}