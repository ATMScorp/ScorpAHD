import { Component } from '@angular/core';
import { StudentService } from '../../student-service/student.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent {

  student: any;
  isSpinning = false;
  validateForm!: FormGroup;

  FIELD_OF_STUDY: { [key: string]: string[] } = {
    "Department of Computer Science": [
      "Software Engineering (Bachelor's)",
      "Data Science (Bachelor's)",
      "Cybersecurity (Bachelor's)",
      "Artificial Intelligence (Master's)",
      "Computer Networks (Master's)"
    ],
    "Department of Business Administration": [
      "Business Management (Bachelor's)",
      "Marketing (Bachelor's)",
      "Finance and Accounting (Bachelor's)",
      "International Business (Master's)",
      "Entrepreneurship (Master's)"
    ],
    "Department of Psychology": [
      "Clinical Psychology (Bachelor's)",
      "Educational Psychology (Bachelor's)",
      "Counseling Psychology (Bachelor's)",
      "Forensic Psychology (Master's)",
      "Industrial-Organizational Psychology (Master's)"
    ],
    "Department of Art and Design": [
      "Graphic Design (Bachelor's)",
      "Interior Design (Bachelor's)",
      "Fine Arts (Bachelor's)",
      "Fashion Design (Master's)",
      "Digital Media Arts (Master's)"
    ],
    "Department of Environmental Studies": [
      "Environmental Science (Bachelor's)",
      "Sustainable Development (Bachelor's)",
      "Ecology (Bachelor's)",
      "Environmental Policy (Master's)",
      "Climate Change Studies (Master's)"
    ],
    "Department of Engineering": [
      "Mechanical Engineering (Bachelor's)",
      "Electrical Engineering (Bachelor's)",
      "Civil Engineering (Bachelor's)",
      "Biomedical Engineering (Master's)",
      "Aerospace Engineering (Master's)"
    ]
  };

  DEPARTMENT: string[] = [
    "Department of Computer Science",
    "Department of Business Administration",
    "Department of Psychology",
    "Department of Art and Design",
    "Department of Environmental Studies",
    "Department of Engineering"
  ];

  GENDER: string[] = [
    "MALE",
    "FEMALE"
  ];

  ACADEMIC_YEARS: string[] = ["I", "II", "III", "IV", "V"];

  ROOM_NUMBER: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",];

  constructor(private studentService: StudentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      department: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      academicYear: ['', Validators.required]
    });
    this.getStudentById();
  }

  getStudentById() {
    this.studentService.getStudentById().subscribe((res) => {
      const student = res.studentDto;
      this.validateForm.patchValue(student);
    })
  }

  updateStudent() {
    this.studentService.updateStudent(this.validateForm.value).subscribe(
      (res) => {
        if (res.id != null) {
          this.snackBar.open("Record updated successfully.", "Close", { duration: 5000 });
          this.getStudentById();
        } else {
          this.snackBar.open("Student not found.", "Close", { duration: 5000 });
        }
      }
    )
  }

  updateFieldOfStudy(): void {
    const department = this.validateForm.get('department').value;
    const fieldOfStudyControl = this.validateForm.get('fieldOfStudy');
    if (department) {
      const fieldsOfStudy = this.FIELD_OF_STUDY[department];
      if (fieldsOfStudy && fieldsOfStudy.length > 0) {
        fieldOfStudyControl.setValue(fieldsOfStudy[0]);
      }
      fieldOfStudyControl.enable();
      fieldOfStudyControl.setValidators(Validators.required);
    } else {
      fieldOfStudyControl.setValue('');
      fieldOfStudyControl.disable();
      fieldOfStudyControl.clearValidators();
    }
  }

}
