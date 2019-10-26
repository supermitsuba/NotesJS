import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewCategoryComponent } from './categories/new-category/new-category.component';
import { NewNotesComponent } from './notes/new-notes/new-notes.component';
import { ViewNotesComponent } from './notes/view-notes/view-notes.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NewCategoryComponent,
    NewNotesComponent,
    ViewNotesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
