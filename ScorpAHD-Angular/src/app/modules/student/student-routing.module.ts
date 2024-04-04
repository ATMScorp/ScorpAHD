import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './student-components/profile/profile.component';
import { StudentGuard } from '../../auth/guards/student-guard/student.guard';
import { UpdateStudentComponent } from './student-components/update-student/update-student.component';
import { NewsComponent } from './student-components/news/news.component';

const routes: Routes = [
  { path: "profile", component: ProfileComponent, canActivate: [StudentGuard]},
  { path: "update", component: UpdateStudentComponent, canActivate: [StudentGuard]},
  { path: "news", component: NewsComponent, canActivate: [StudentGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
