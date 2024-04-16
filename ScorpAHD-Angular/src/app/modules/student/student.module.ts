import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StudentRoutingModule } from './student-routing.module';
import { ProfileComponent } from './student-components/profile/profile.component';
import { UpdateStudentComponent } from './student-components/update-student/update-student.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NewsComponent } from './student-components/news/news.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { PhotoModalComponent } from './student-dialogues/photo-modal/photo-modal.component';
import { ChangePasswordComponent } from './student-components/change-password/change-password.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UpdateStudentComponent,
    NewsComponent,
    PhotoModalComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule
  ]
})
export class StudentModule { }
