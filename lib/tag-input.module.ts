import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagInputAutocompleteComponent } from './tag-input-autocomplete/tag-input-autocomplete.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { TagInputItemComponent } from './tag-input-item/tag-input-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TagInputAutocompleteComponent,
    TagInputComponent,
    TagInputItemComponent
  ],
  exports: [
    TagInputComponent
  ]
})
export class RlTagInputModule {}
