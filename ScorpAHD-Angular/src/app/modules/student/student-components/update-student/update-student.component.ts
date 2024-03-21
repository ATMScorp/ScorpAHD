import { Component } from '@angular/core';
import { StudentService } from '../../student-service/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    "Wydział Teologii": ["Licentiate Programme in Systematic Theology", 
                          "Nauki o rodzinie (stacjonarne I stopnia)",
                          "Nauki o rodzinie (stacjonarne I stopnia) w Filii KUL w Stalowej Woli",
                          "Nauki o rodzinie (stacjonarne II stopnia)"
                        ],
    "Wydział Prawa, Prawa Kanonicznego i Administracji": ["Administracja (stacjonarne I stopnia)",
                                                          "Administracja (stacjonarne II stopnia)",
                                                          "Europeistyka - grupa w języku angielskim (stacjonarne I stopnia)",
                                                          "Prawo Kanoniczne (niestacjonarne jednolite magisterskie)",
                                                          "Prawo Kanoniczne (stacjonarne jednolite magisterskie)",
                                                          "Prawo (niestacjonarne jednolite magisterskie)",
                                                          "Prawo (stacjonarne jednolite magisterskie)",
                                                          "Prawo Unii Europejskiej - grupa w języku angielskim (stacjonarne II stopnia)",
                                                          "Prawo w biznesie (stacjonarne I stopnia)",
                                                          "Prawo w biznesie (stacjonarne II stopnia)"
                                                        ],
    "Wydział Filozofii" : ["Applied Anthropology (stacjonarne I stopnia)",
                           "Filozofia - grupa w języku angielskim (stacjonarne I stopnia)",
                           "Filozofia - grupa w języku angielskim (stacjonarne II stopnia)",
                           "Filozofia (stacjonarne I stopnia)",
                           "Filozofia (stacjonarne II stopnia)",
                           "Kognitywistyka (stacjonarne I stopnia)",
                           "Kognitywistyka (stacjonarne II stopnia)",
                           "Retoryka stosowana (stacjonarne I stopnia)",
                           "Retoryka stosowana (stacjonarne II stopnia)",
                           "Sztuczna Inteligencja (stacjonarne I stopnia)"

    ],
    "Wydział Nauk Humanistycznych" : ["Edytorstwo (stacjonarne I stopnia)",
                                      "Filologia Angielska (niestacjonarne I stopnia)",
                                      "Filologia Angielska (niestacjonarne II stopnia)",
                                      "Filologia Angielska (stacjonarne I stopnia)",
                                      "Filologia Angielska (stacjonarne II stopnia)",
                                      "Filologia Germańska (stacjonarne I stopnia)",
                                      "Filologia Germańska (stacjonarne II stopnia)",
                                      "Filologia Klasyczna (stacjonarne I stopnia)",
                                      "Filologia Klasyczna (stacjonarne II stopnia)",
                                      "Filologia Niderlandzka (stacjonarne I stopnia)",
                                      "Filologia Niderlandzka (stacjonarne II stopnia)",
                                      "Filologia Polska (stacjonarne I stopnia)",
                                      "Filologia Polska (stacjonarne II stopnia)",
                                      "Filologia Romańska (stacjonarne I stopnia)",
                                      "Filologia Romańska (stacjonarne II stopnia)",
                                      "Germanistyka (stacjonarne I stopnia)",
                                      "Hispanistyka (stacjonarne I stopnia)",
                                      "Hispanistyka (stacjonarne II stopnia)",
                                      "Historia (stacjonarne I stopnia)",
                                      "Historia (stacjonarne II stopnia)",
                                      "Historia Sztuki (stacjonarne I stopnia)",
                                      "Historia Sztuki (stacjonarne II stopnia)",
                                      "Humanistyka cyfrowa (stacjonarne II stopnia)",
                                      "Italianistyka - grupa hybrydowa (stacjonarne I stopnia)",
                                      "Italianistyka (stacjonarne I stopnia)",
                                      "Krajoznawstwo i turystyka kulturowa (stacjonarne I stopnia)",
                                      "Lingwistyka stosowana (stacjonarne I stopnia)",
                                      "Lingwistyka stosowana (stacjonarne II stopnia)",
                                      "Muzykologia (stacjonarne I stopnia)",
                                      "Muzykologia (stacjonarne II stopnia)",
                                      "Romanistyka (stacjonarne I stopnia)",
                                      "Sinologia (stacjonarne I stopnia)",
                                      "Sinologia (stacjonarne II stopnia)",
                                      "Turystyka kulturowa (stacjonarne II stopnia)"
    ],
    "Wydział Nauk Społecznych" : ["Bezpieczeństwo narodowe (stacjonarne I stopnia)",
                                  "Bezpieczeństwo narodowe (stacjonarne I stopnia) w Filii KUL w Stalowej Woli",
                                  "Bezpieczeństwo narodowe (stacjonarne II stopnia)",
                                  "Bezpieczeństwo narodowe (stacjonarne II stopnia) w Filii KUL w Stalowej Woli",
                                  "Coaching i doradztwo kariery (stacjonarne I stopnia)",
                                  "Doradztwo kariery i doradztwo personalne (stacjonarne I stopnia)",
                                  "Dziennikarstwo i komunikacja społeczna (stacjonarne I stopnia)",
                                  "Dziennikarstwo i komunikacja społeczna (stacjonarne II stopnia)",
                                  "Ekonomia (stacjonarne I stopnia)",
                                  "Ekonomia (stacjonarne II stopnia)",
                                  "Kryminologia (stacjonarne I stopnia)",
                                  "Kryminologia (stacjonarne II stopnia)",
                                  "Pedagogika przedszkolna i wczesnoszkolna (stacjonarne jednolite magisterskie)",
                                  "Pedagogika specjalna (stacjonarne II stopnia)",
                                  "Pedagogika specjalna (stacjonarne jednolite magisterskie)",
                                  "Pedagogika (stacjonarne I stopnia)",
                                  "Pedagogika (stacjonarne II stopnia)",
                                  "Praca socjalna i ekonomia społeczna (stacjonarne II stopnia)",
                                  "Praca socjalna (stacjonarne I stopnia)",
                                  "Psychologia (stacjonarne jednolite magisterskie)",
                                  "Socjologia (stacjonarne I stopnia)",
                                  "Socjologia (stacjonarne II stopnia)",
                                  "Stosunki międzynarodowe - grupa w języku angielskim (stacjonarne II stopnia)",
                                  "Stosunki międzynarodowe (stacjonarne I stopnia)",
                                  "Stosunki międzynarodowe (stacjonarne II stopnia)",
                                  "Zarządzanie (stacjonarne I stopnia)",
                                  "Zarządzanie (stacjonarne II stopnia)"
    ],
    "Wydział Medyczny" : ["Bioanalytical Technologies (stacjonarne II stopnia)",
                          "Biotechnologia - grupa w języku angielskim (stacjonarne I stopnia)",
                          "Biotechnologia - grupa w języku angielskim (stacjonarne II stopnia)",
                          "Biotechnologia (stacjonarne I stopnia)",
                          "Biotechnologia (stacjonarne II stopnia)",
                          "Dietetyka (stacjonarne I stopnia) w Filii KUL w Stalowej Woli",
                          "Kierunek lekarski (stacjonarne jednolite magisterskie)",
                          "Pielęgniarstwo (niestacjonarne II stopnia)",
                          "Pielęgniarstwo (stacjonarne I stopnia)",
                          "Pielęgniarstwo (stacjonarne I stopnia) L",
                          "Pielęgniarstwo (stacjonarne II stopnia)",
                          "Położnictwo (stacjonarne I stopnia)"
    ],
    "Wydział Nauk Przyrodniczych i Technicznych" : ["Architektura Krajobrazu (stacjonarne I stopnia) 7",
                                                    "Architektura Krajobrazu (stacjonarne II stopnia) L",
                                                    "Informatyka - grupa w języku angielskim (stacjonarne I stopnia)",
                                                    "Informatyka (stacjonarne I stopnia)",
                                                    "Informatyka (stacjonarne II stopnia)",
                                                    "Inżynieria środowiska (stacjonarne I stopnia) w Filii KUL w Stalowej Woli",
                                                    "Matematyka (stacjonarne I stopnia)"
    ]
  };

  DEPARTMENT: string[] = [
    "Wydział Teologii", 
    "Wydział Prawa, Prawa Kanonicznego i Administracji",
    "Wydział Filozofii",
    "Wydział Nauk Humanistycznych",
    "Wydział Nauk Społecznych",
    "Wydział Medyczny",
    "Wydział Nauk Przyrodniczych i Technicznych"
  ];

  GENDER: string[] = [
    "MALE",
    "FEMALE"
  ];

  ACADEMIC_YEARS: string[] = ["I", "II", "III", "IV", "V"];

  ROOM_NUMBER: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  constructor(private studentService: StudentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      department: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      academicYear: ['', Validators.required],
      roomNumber: ['', Validators.required]
    });
    this.getStudentById();
  }

  getStudentById(){
    this.studentService.getStudentById().subscribe((res) => {
      console.log(res);
      const student = res.studentDto;
      this.validateForm.patchValue(student);
    })
  }

  updateStudent(){
    this.studentService.updateStudent(this.validateForm.value).subscribe(
      (res) => {
        console.log(res);
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