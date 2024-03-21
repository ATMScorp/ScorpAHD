import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Student {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  department: string;
  fieldOfStudy: string;
  dateOfBirth: Date;
  address: string;
  gender: string;
  roomNumber: string;
  academicYear: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  students: any;

  constructor(private service: AdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit(){
    this.getAllStudents();
  }

  getAllStudents(){
    this.service.getAllStudents().subscribe((res) => {
      console.log(res);
      this.students = res;
    })
  }

  deleteStudent(studentId: number){
    this.service.deleteStudent(studentId).subscribe((res) => {
      console.log(res);
      this.getAllStudents();
      this.snackBar.open("Student deleted successfully", "Close", { duration: 5000 });
    });
  }
}
