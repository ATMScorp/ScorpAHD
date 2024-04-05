import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  students: any;
  originalStudents: any;
  departmentFilterInput: string = '';
  fieldOfStudyFilterInput: string = '';
  roomNumberFilterInput: string = '';
  academicYearFilterInput: string = '';
  sorting: boolean = false;
  showDepartmentFilter: boolean = false;
  showFieldOfStudyFilter: boolean = false;
  showRoomNumberFilter: boolean = false;
  showAcademicYearFilter: boolean = false;

  constructor(private service: AdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.service.getAllStudents().subscribe((res) => {
      console.log(res);
      this.students = res;
      this.originalStudents = res;
    })
  }

  deleteStudent(studentId: number) {
    this.service.deleteStudent(studentId).subscribe((res) => {
      console.log(res);
      this.getAllStudents();
      this.snackBar.open("Student deleted successfully", "Close", { duration: 5000 });
    });
  }

  toggleSort(fieldName: string) {
    this.sorting = !this.sorting;
    if (this.sorting) {
      this.sortStudents(fieldName);
    } else {
      this.getAllStudents();
    }
  }

  sortStudents(fieldName: string) {
    this.students.sort((a, b) => {
      if (a[fieldName] < b[fieldName]) return -1;
      if (a[fieldName] > b[fieldName]) return 1;
      return 0;
    });
  }

  toggleFilter(fieldName: string) {
    switch (fieldName) {
      case 'department':
        this.showDepartmentFilter = !this.showDepartmentFilter;
        break;
      case 'fieldOfStudy':
        this.showFieldOfStudyFilter = !this.showFieldOfStudyFilter;
        break;
      case 'roomNumber':
        this.showRoomNumberFilter = !this.showRoomNumberFilter;
        break;
      case 'academicYear': // Добавляем обработчик для academicYear
        this.showAcademicYearFilter = !this.showAcademicYearFilter;
        break;
    }
  }

  filterStudents() {
    this.students = this.originalStudents.filter(student => {
      let passDepartmentFilter = true;
      let passFieldOfStudyFilter = true;
      let passRoomNumberFilter = true;
      let passAcademicYearFilter = true;

      if (this.departmentFilterInput) {
        passDepartmentFilter = student.department.toLowerCase().includes(this.departmentFilterInput.toLowerCase());
      }

      if (this.fieldOfStudyFilterInput) {
        passFieldOfStudyFilter = student.fieldOfStudy.toLowerCase().includes(this.fieldOfStudyFilterInput.toLowerCase());
      }

      if (this.roomNumberFilterInput !== '') {
        passRoomNumberFilter = student.roomNumber === this.roomNumberFilterInput;
      }

      // Добавляем фильтрацию для academicYear
      if (this.academicYearFilterInput !== '') {
        passAcademicYearFilter = student.academicYear === this.academicYearFilterInput;
      }

      return passDepartmentFilter && passFieldOfStudyFilter && passRoomNumberFilter && passAcademicYearFilter;
    });

    if (!this.departmentFilterInput && !this.fieldOfStudyFilterInput && this.roomNumberFilterInput === '' && this.academicYearFilterInput === '') {
      this.students = this.originalStudents;
    }
  }
}
