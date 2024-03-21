import { Component } from '@angular/core';
import { StudentService } from '../../student-service/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  student: any;

  constructor(
    private service: StudentService
  ) {}

  ngOnInit() {
    this.getStudentById();
  }

  getStudentById() {
    this.service.getStudentById().subscribe(
      (res) => {
        console.log(res);
        this.student = res.studentDto;
      }
    )
  }
}
