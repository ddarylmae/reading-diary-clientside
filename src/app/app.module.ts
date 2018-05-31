import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReadingsComponent } from './readings/readings.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryService } from './shared/category.service';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageService } from './shared/message.service';
import { ReadingDetailsComponent } from './reading-details/reading-details.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ReadingsComponent,
    CategoriesComponent,
    CategoryDetailsComponent,
    ReadingDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ CategoryService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
