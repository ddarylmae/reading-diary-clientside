import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { ReadingDetailsComponent } from './reading-details/reading-details.component';
<<<<<<< HEAD
import { ReadingService } from './shared/reading.service';
=======
import { RegistrationComponent } from './registration/registration.component';
import { UserService } from './shared/user.service';
import { ReadingService } from './shared/reading.service';
import { MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';
>>>>>>> adba9bd352dc34ec9eff14f5610840c16ee9c34d

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ReadingsComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    ReadingDetailsComponent,
    RegistrationComponent
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
    MatIconModule
  ],
<<<<<<< HEAD
  providers: [ CategoryService, MessageService, ReadingService],
  bootstrap: [AppComponent]
=======
  providers: [ CategoryService, MessageService, UserService, ReadingService ],
  bootstrap: [ AppComponent] ,
  entryComponents: [ CategoryDetailsComponent ]
>>>>>>> adba9bd352dc34ec9eff14f5610840c16ee9c34d
})
export class AppModule { }
