import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { KEYS } from '../../shared/tag-input-keys';

/**
 * Taken from @angular/common/src/facade/lang
 */
function isBlank(obj: any): boolean {
  return obj === undefined || obj === null;
}

export interface AutoCompleteItem {
  [index: string]: any;
}

@Component({
  selector: 'rl-tag-input',
  template: `
    <rl-tag-input-item
      [text]="tag"
      [index]="index"
      [selected]="selectedTag === index"
      (tagRemoved)="_removeTag($event)"
      *ngFor="let tag of tagsList; let index = index">
    </rl-tag-input-item>
    <form [formGroup]="tagInputForm" class="ng2-tag-input-form">
      <input
        class="ng2-tag-input-field"
        type="text"
        #tagInputElement
        formControlName="tagInputField"
        [placeholder]="placeholder"
        (paste)="onInputPaste($event)"
        (keydown)="onKeydown($event)"
        (blur)="onInputBlurred($event)"
        (focus)="onInputFocused()">

      <div *ngIf="showAutocomplete()" class="rl-tag-input-autocomplete-container">
        <rl-tag-input-autocomplete
          [items]="autocompleteResults"
          [selectFirstItem]="autocompleteSelectFirstItem"
          (itemSelected)="onAutocompleteSelect($event)"
          (enterPressed)="onAutocompleteEnter($event)">
        </rl-tag-input-autocomplete>
      </div>
    </form>
  `,
  styles: [`
    :host {
      font-family: "Roboto", "Helvetica Neue", sans-serif;
      font-size: 16px;
      display: block;
      box-shadow: 0 1px #ccc;
      padding: 8px 0 6px 0;
      will-change: box-shadow;
      transition: box-shadow 0.12s ease-out;
    }

     :host .ng2-tag-input-form {
      display: inline;
    }

     :host .ng2-tag-input-field {
      font-family: "Roboto", "Helvetica Neue", sans-serif;
      font-size: 16px;
      display: inline-block;
      width: auto;
      box-shadow: none;
      border: 0;
      padding: 8px 0;
    }

     :host .ng2-tag-input-field:focus {
      outline: 0;
    }

     :host .rl-tag-input-autocomplete-container {
      position: relative;
      z-index: 10;
    }

    :host.ng2-tag-input-focus {
      box-shadow: 0 2px #0d8bff;
    }
  `],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TagInputComponent), multi: true},
  ]
})
export class TagInputComponent implements ControlValueAccessor, OnDestroy, OnInit {
  @HostBinding('class.ng2-tag-input-focus') isFocused;
  @Input() addOnBlur: boolean = true;
  @Input() addOnComma: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() addOnSpace: boolean = false;
  @Input() allowDuplicates: boolean = false;
  @Input() allowedTagsPattern: RegExp = /.+/;
  @Input() autocomplete: boolean = false;
  @Input() autocompleteItems: string[] = [];
  @Input() autocompleteMustMatch: boolean = true;
  @Input() autocompleteSelectFirstItem: boolean = true;
  @Input() pasteSplitPattern: string = ',';
  @Input() placeholder: string = 'Add a tag';
  @Output('addTag') addTag: EventEmitter<string> = new EventEmitter<string>();
  @Output('removeTag') removeTag: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('tagInputElement') tagInputElement: ElementRef;

  private canShowAutoComplete: boolean = false;
  private tagInputSubscription: Subscription;
  private splitRegExp: RegExp;
  private get tagInputField(): AbstractControl {
    return this.tagInputForm.get('tagInputField');
  }
  private get inputValue(): string {
    return this.tagInputField.value;
  }

  public tagInputForm: FormGroup;
  public autocompleteResults: string[] = [];
  public tagsList: string[] = [];
  public selectedTag: number;

  @HostListener('document:click', ['$event', '$event.target']) onDocumentClick(event: MouseEvent, target: HTMLElement) {
    if (!target) {
      return;
    }

    if (!this.elementRef.nativeElement.contains(target)) {
      this.canShowAutoComplete = false;
    }
  }

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef) {}

  ngOnInit() {
    this.splitRegExp = new RegExp(this.pasteSplitPattern);

    this.tagInputForm = this.fb.group({
      tagInputField: ''
    });

    this.tagInputSubscription = this.tagInputField.valueChanges
    .do(value => {
      this.autocompleteResults = this.autocompleteItems.filter(item => {
        /**
         * _isTagUnique makes sure to remove items from the autocompelte dropdown if they have
         * already been added to the model, and allowDuplicates is false
         */
        return item.toLowerCase().indexOf(value.toLowerCase()) > -1 && this._isTagUnique(item);
      });
    })
    .subscribe();
  }

  onKeydown(event: KeyboardEvent): void {
    let key = event.keyCode;
    switch (key) {
      case KEYS.backspace:
        this._handleBackspace();
        break;

      case KEYS.enter:
        if (this.addOnEnter && !this.showAutocomplete()) {
          this._addTags([this.inputValue]);
          event.preventDefault();
        }
        break;

      case KEYS.comma:
        if (this.addOnComma) {
          this._addTags([this.inputValue]);
          event.preventDefault();
        }
        break;

      case KEYS.space:
        if (this.addOnSpace) {
          this._addTags([this.inputValue]);
          event.preventDefault();
        }
        break;

      default:
        break;
    }
  }

  onInputBlurred(event): void {
    if (this.addOnBlur) { this._addTags([this.inputValue]); }
    this.isFocused = false;
  }

  onInputFocused(): void {
    this.isFocused = true;
    setTimeout(() => this.canShowAutoComplete = true);
  }

  onInputPaste(event): void {
    let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let pastedString = clipboardData.getData('text/plain');
    let tags = this._splitString(pastedString);
    this._addTags(tags);
    setTimeout(() => this._resetInput());
  }

  onAutocompleteSelect(selectedItem) {
    this._addTags([selectedItem]);
    this.tagInputElement.nativeElement.focus();
  }

  onAutocompleteEnter() {
    if (this.addOnEnter && this.showAutocomplete() && !this.autocompleteMustMatch) {
      this._addTags([this.inputValue]);
    }
  }

  showAutocomplete(): boolean {
    return (
      this.autocomplete &&
      this.autocompleteItems &&
      this.autocompleteItems.length > 0 &&
      this.canShowAutoComplete &&
      this.inputValue.length > 0
    );
  }

  private _splitString(tagString: string): string[] {
    tagString = tagString.trim();
    let tags = tagString.split(this.splitRegExp);
    return tags.filter((tag) => !!tag);
  }

  private _isTagValid(tagString: string): boolean {
    return this.allowedTagsPattern.test(tagString) &&
           this._isTagUnique(tagString);
  }

  private _isTagUnique(tagString: string): boolean {
    return this.allowDuplicates ? true : this.tagsList.indexOf(tagString) === -1;
  }

  private _isTagAutocompleteItem(tagString: string): boolean {
    return this.autocompleteItems.indexOf(tagString) > -1;
  }

  private _emitTagAdded(addedTags: string[]): void {
    addedTags.forEach(tag => this.addTag.emit(tag));
  }

  private _emitTagRemoved(removedTag): void {
    this.removeTag.emit(removedTag);
  }

  private _addTags(tags: string[]): void {
    let validTags = tags.map(tag => tag.trim())
                        .filter(tag => this._isTagValid(tag))
                        .filter((tag, index, tagArray) => tagArray.indexOf(tag) === index)
                        .filter(tag => (this.showAutocomplete() && this.autocompleteMustMatch) ? this._isTagAutocompleteItem(tag) : true);

    this.tagsList = this.tagsList.concat(validTags);
    this._resetSelected();
    this._resetInput();
    this.onChange(this.tagsList);
    this._emitTagAdded(validTags);
  }

  private _removeTag(tagIndexToRemove: number): void {
    let removedTag = this.tagsList[tagIndexToRemove];
    this.tagsList.splice(tagIndexToRemove, 1);
    this._resetSelected();
    this.onChange(this.tagsList);
    this._emitTagRemoved(removedTag);
  }

  private _handleBackspace(): void {
    if (!this.inputValue.length && this.tagsList.length) {
      if (!isBlank(this.selectedTag)) {
        this._removeTag(this.selectedTag);
      } else {
        this.selectedTag = this.tagsList.length - 1;
      }
    }
  }

  private _resetSelected(): void {
    this.selectedTag = null;
  }

  private _resetInput(): void {
    this.tagInputField.setValue('');
  }

  /** Implemented as part of ControlValueAccessor. */
  onChange: (value: any) => any = () => { };

  onTouched: () => any = () => { };

  writeValue(value: any) {
    this.tagsList = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    if (this.tagInputSubscription) {
      this.tagInputSubscription.unsubscribe();
    }
  }
}
