import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RlTagInputModule } from '../lib/tag-input.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RlTagInputModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
