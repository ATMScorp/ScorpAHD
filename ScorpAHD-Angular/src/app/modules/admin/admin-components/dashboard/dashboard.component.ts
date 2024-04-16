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
  emailFilterInput: string = '';
  secondNameFilterInput: string = '';
  firstNameFilterInput: string = '';
  genderFilterInput: string = '';
  sorting: boolean = false;
  showDepartmentFilter: boolean = false;
  showFieldOfStudyFilter: boolean = false;
  showRoomNumberFilter: boolean = false;
  showAcademicYearFilter: boolean = false;
  showEmailFilter: boolean = false;
  showSecondNameFilter: boolean = false;
  showGenderFilter: boolean = false;
  showFirstNameFilter: boolean = false;

  constructor(private service: AdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    this.service.getAllStudents().subscribe((res) => {
      this.students = res;
      this.originalStudents = res;
    })
  }

  deleteStudent(studentId: number) {
    this.service.deleteStudent(studentId).subscribe((res) => {
      this.getAllStudents();
      this.snackBar.open("Student deleted successfully", "Close", { duration: 5000 });
    });
  }

  toggleSort(fieldName: string) {
    if (!this.sorting) {
      this.sortStudents(fieldName);
    } else {
      this.students.reverse();
    }
    this.sorting = !this.sorting;
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
      case 'academicYear':
        this.showAcademicYearFilter = !this.showAcademicYearFilter;
        break;
      case 'email':
        this.showEmailFilter = !this.showEmailFilter;
        break;
      case 'secondName':
        this.showSecondNameFilter = !this.showSecondNameFilter;
        break;
      case 'gender':
        this.showGenderFilter = !this.showGenderFilter;
        break;
      case 'firstName':
        this.showFirstNameFilter = !this.showFirstNameFilter;
        break;
    }
  }

  filterStudents() {
    this.students = this.originalStudents.filter(student => {
      let passDepartmentFilter = true;
      let passFieldOfStudyFilter = true;
      let passRoomNumberFilter = true;
      let passAcademicYearFilter = true;
      let passEmailFilter = true;
      let passSecondNameFilter = true;
      let passGenderFilter = true;
      let passFirstNameFilter = true;

      if (this.firstNameFilterInput) {
        passFirstNameFilter = student.firstName.toLowerCase().includes(this.firstNameFilterInput.toLowerCase());
      }

      if (this.departmentFilterInput) {
        passDepartmentFilter = student.department.toLowerCase().includes(this.departmentFilterInput.toLowerCase());
      }

      if (this.fieldOfStudyFilterInput) {
        passFieldOfStudyFilter = student.fieldOfStudy.toLowerCase().includes(this.fieldOfStudyFilterInput.toLowerCase());
      }

      if (this.roomNumberFilterInput !== '') {
        passRoomNumberFilter = student.roomNumber === this.roomNumberFilterInput;
      }

      if (this.academicYearFilterInput !== '') {
        passAcademicYearFilter = student.academicYear === this.academicYearFilterInput;
      }

      if (this.emailFilterInput) {
        passEmailFilter = student.email.toLowerCase().includes(this.emailFilterInput.toLowerCase());
      }

      if (this.secondNameFilterInput) {
        passSecondNameFilter = student.secondName.toLowerCase().includes(this.secondNameFilterInput.toLowerCase());
      }

      if (this.genderFilterInput !== '') {
        passGenderFilter = student.gender.toLowerCase() === this.genderFilterInput.toLowerCase();
      }

      return passFirstNameFilter && passGenderFilter && passEmailFilter && passSecondNameFilter && passDepartmentFilter && passFieldOfStudyFilter && passRoomNumberFilter && passAcademicYearFilter;
    });

    if (!this.firstNameFilterInput && !this.emailFilterInput && !this.secondNameFilterInput && !this.departmentFilterInput && !this.departmentFilterInput && !this.fieldOfStudyFilterInput && !this.genderFilterInput && this.roomNumberFilterInput === '' && this.academicYearFilterInput === '') {
      this.students = this.originalStudents;
    }
  }
}