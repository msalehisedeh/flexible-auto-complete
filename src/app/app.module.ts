import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FlexibleAutoCompleteModule } from './flexible-auto-complete/flexible-auto-complete-module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FlexibleAutoCompleteModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
