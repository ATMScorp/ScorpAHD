import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { PostStudentComponent } from './admin-components/post-student/post-student.component';
import { UpdateStudentComponent } from './admin-components/update-student/update-student.component';
import { EventComponent } from './admin-components/event/event.component';
import { UpdateEventComponent } from './admin-components/update-event/update-event.component';
import { SendMailComponent } from './admin-components/send-mail/send-mail.component';
import { DeleteConfirmationComponent } from './admin-dialogues/delete-confirmation-password/delete-confirmation-password.component';
import { DeleteConfirmationEventComponent } from './admin-dialogues/delete-confirmation-event/delete-confirmation-event.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogActions, MatDialogContent, MatDialogClose } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DashboardComponent,
    PostStudentComponent,
    UpdateStudentComponent,
    SendMailComponent,
    EventComponent,
    UpdateEventComponent,
    DeleteConfirmationComponent,
    DeleteConfirmationEventComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose
  ]
})
export class AdminModule { }
