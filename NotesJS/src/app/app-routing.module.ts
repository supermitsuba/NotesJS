import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewCategoryComponent } from './categories/new-category/new-category.component';
import { NewNotesComponent } from './notes/new-notes/new-notes.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: NewCategoryComponent },
  { path: 'note', component: NewNotesComponent },
  { path: 'note/:id', component: NewNotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
