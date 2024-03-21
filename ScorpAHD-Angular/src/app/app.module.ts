import { NgModule } from '@angular/core'
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './auth/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatInputModule,
        MatSnackBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }