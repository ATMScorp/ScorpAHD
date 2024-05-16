import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { noAuthGuard } from "./auth/guards/noAuth-guard/no-auth.guard";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";

const routes: Routes = [
    { path: "login", component: LoginComponent, canActivate: [noAuthGuard] },
    { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule) },
    { path: "student", loadChildren: () => import("./modules/student/student.module").then(m => m.StudentModule) },
    { path: "reset-password", component: ResetPasswordComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }