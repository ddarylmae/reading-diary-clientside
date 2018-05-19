import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: [ ]
})

export class AppRoutingModule { }
