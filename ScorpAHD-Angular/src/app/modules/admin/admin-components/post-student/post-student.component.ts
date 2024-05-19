import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-student',
  templateUrl: './post-student.component.html',
  styleUrls: ['./post-student.component.scss']
})
export class PostStudentComponent {

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

  isSpinning: boolean;
  validateForm: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  comfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      password: ['', Validators.required],
      checkPassword: ['', [Validators.required, this.comfirmationValidator]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      department: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      academicYear: ['', Validators.required],
      roomNumber: ['', Validators.required]
    })
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


  postStudent() {
    if (this.validateForm.valid) {
      this.service.addStudent(this.validateForm.value).subscribe({
        next: () => {
          this.snackBar.open('Student registered successfully', 'Close', {
            duration: 3000,
          });
          this.validateForm.reset();
        },
        error: (error) => {
          console.error('Error occurred while registering student:', error);
          this.snackBar.open('Error occurred while registering student', 'Close', {
            duration: 3000,
          });
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
