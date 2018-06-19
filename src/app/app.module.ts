import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReadingsComponent } from './readings/readings.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryService } from './shared/category.service';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from './shared/message.service';
import { ScriptService } from './shared/script.service';
import { ReadingDetailsComponent } from './reading-details/reading-details.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserService } from './shared/user.service';
import { ReadingService } from './shared/reading.service';
import { JWTInterceptor } from './app.interceptor';
import { TokenStorage } from './token.storage';
import { RouteGuard } from './route-guard';
import { MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatListModule
} from '@angular/material';
import { StarComponent } from './shared/star.component';
import { LoginComponent } from './login/login.component';
import { DeleteConfDialogComponent } from './shared/delete-confirmation.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ReadingsComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    ReadingDetailsComponent,
    RegistrationComponent,
    StarComponent,
    LoginComponent,
    DeleteConfDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatListModule
  ],
  providers: [ CategoryService, MessageService, UserService, ReadingService,
    RouteGuard, TokenStorage, ScriptService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true } ],
  bootstrap: [ AppComponent] ,
  entryComponents: [ CategoryDetailsComponent, ReadingDetailsComponent, DeleteConfDialogComponent ]
})
export class AppModule { }
