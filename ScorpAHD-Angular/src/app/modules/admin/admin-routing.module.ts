import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { AdminGuard } from '../../auth/guards/admin-guard/admin.guard';
import { PostStudentComponent } from './admin-components/post-student/post-student.component';
import { UpdateStudentComponent } from './admin-components/update-student/update-student.component';
import { SendMailComponent } from './admin-components/send-mail/send-mail.component';
import { EventComponent } from './admin-components/event/event.component';
import { UpdateEventComponent } from './admin-components/update-event/update-event.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AdminGuard] },
  { path: "export-students", component: DashboardComponent, canActivate: [AdminGuard] },
  { path: "student", component: PostStudentComponent, canActivate: [AdminGuard] },
  { path: "dashboard/update/:studentId", component: UpdateStudentComponent, canActivate: [AdminGuard] },
  { path: "send", component: SendMailComponent, canActivate: [AdminGuard] },
  { path: "event", component: EventComponent, canActivate: [AdminGuard] },
  { path: "event/update/:eventId", component: UpdateEventComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
