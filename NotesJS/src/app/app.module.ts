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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SelectCategoryComponent } from './categories/select-category/select-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NewCategoryComponent,
    NewNotesComponent,
    ViewNotesComponent,
    DashboardComponent,
    SelectCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
