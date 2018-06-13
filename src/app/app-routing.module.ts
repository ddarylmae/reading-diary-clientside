import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReadingsComponent } from './readings/readings.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RouteGuard } from './route-guard';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent, canActivate: [RouteGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard] },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'readings', component: ReadingsComponent, canActivate: [RouteGuard] },
  { path: 'category-details/:id', component: CategoryDetailsComponent, canActivate: [RouteGuard] }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: [ ]
})

export class AppRoutingModule { }
