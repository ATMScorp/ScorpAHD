import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { noAuthGuard } from "./auth/guards/noAuth-guard/no-auth.guard";
import { HomeComponent } from "./auth/home/home.component";

const routes: Routes = [
    { path: "home", component: HomeComponent, canActivate: [noAuthGuard] },
    { path: "login", component: LoginComponent, canActivate: [noAuthGuard] },
    { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule) },
    { path: "student", loadChildren: () => import("./modules/student/student.module").then(m => m.StudentModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }