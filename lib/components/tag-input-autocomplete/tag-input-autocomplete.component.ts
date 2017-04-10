import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { KEYS } from '../../shared/tag-input-keys';

@Component({
  selector: 'rl-tag-input-autocomplete',
  template: `
    <div
      *ngFor="let item of items; let itemIndex = index"
      [ngClass]="{ 'is-selected': selectedItemIndex === itemIndex }"
      (click)="selectItem(itemIndex)"
      class="rl-autocomplete-item">
      {{item}}
    </div>
  `,
  styles: [`
    :host {
      box-shadow: 0 1.5px 4px rgba(0, 0, 0, 0.24), 0 1.5px 6px rgba(0, 0, 0, 0.12);
      display: block;
      position: absolute;
      top: 100%;
      font-family: "Roboto", "Helvetica Neue", sans-serif;
      font-size: 16px;
      color: #444444;
      background: white;
      padding: 8px 0;
    }

     :host .rl-autocomplete-item {
      padding: 0 16px;
      height: 48px;
      line-height: 48px;
    }

     :host .is-selected {
      background: #eeeeee;
    }
  `]
})
export class TagInputAutocompleteComponent implements OnChanges, OnDestroy, OnInit {
  @Input() items: string[];
  @Input() selectFirstItem: boolean = false;
  @Output() itemSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() enterPressed: EventEmitter<any> = new EventEmitter<any>();
  public selectedItemIndex: number = null;
  private keySubscription: Subscription;
  private get itemsCount(): Number {
    return this.items ? this.items.length : 0;
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.keySubscription = Observable.fromEvent(window, 'keydown')
    .filter(
      (event: KeyboardEvent) =>
      event.keyCode === KEYS.upArrow ||
      event.keyCode === KEYS.downArrow ||
      event.keyCode === KEYS.enter ||
      event.keyCode === KEYS.esc
    )
    .do((event: KeyboardEvent) => {
      switch (event.keyCode) {
        case KEYS.downArrow:
          this.handleDownArrow();
          break;

        case KEYS.upArrow:
          this.handleUpArrow();
          break;

        case KEYS.enter:
          this.selectItem();
          this.enterPressed.emit();
          break;

        case KEYS.esc:
          break;
      }

      event.stopPropagation();
      event.preventDefault();
    })
    .subscribe();
  }

  ensureHighlightVisible() {
    let container = this.elementRef.nativeElement.querySelector('.sk-select-results__container');
    if (!container) {
      return;
    }
    let choices = container.querySelectorAll('.sk-select-results__item');
    if (choices.length < 1) {
      return;
    }
    if (this.selectedItemIndex < 0) {
      return;
    }
    let highlighted: any = choices[this.selectedItemIndex];
    if (!highlighted) {
      return;
    }
    let posY: number = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
    let height: number = container.offsetHeight;

    if (posY > height) {
      container.scrollTop += posY - height;
    } else if (posY < highlighted.clientHeight) {
      container.scrollTop -= highlighted.clientHeight - posY;
    }
  }

  goToTop() {
    this.selectedItemIndex = 0;
    this.ensureHighlightVisible();
  }

  goToBottom(itemsCount) {
    this.selectedItemIndex = itemsCount - 1;
    this.ensureHighlightVisible();
  }

  goToNext() {
    if (this.selectedItemIndex + 1 < this.itemsCount) {
      this.selectedItemIndex++;
    } else {
      this.goToTop();
    }
    this.ensureHighlightVisible();
  }

  goToPrevious() {
    if (this.selectedItemIndex - 1 >= 0) {
      this.selectedItemIndex--;
    } else {
      this.goToBottom(this.itemsCount);
    }
    this.ensureHighlightVisible();
  }

  handleUpArrow() {
    if (this.selectedItemIndex === null) {
      this.goToBottom(this.itemsCount);
    } else {
      this.goToPrevious();
    }
  }

  handleDownArrow() {
    // Initialize to zero if first time results are shown
    if (this.selectedItemIndex === null) {
      this.goToTop();
    } else {
      this.goToNext();
    }
  }

  selectItem(itemIndex?: number): void {
    let itemToEmit = itemIndex ? this.items[itemIndex] : this.items[this.selectedItemIndex];
    if (itemToEmit) {
      this.itemSelected.emit(itemToEmit);
    }
  }

  ngOnChanges(changes) {
    if (this.selectFirstItem && this.itemsCount > 0) {
      this.goToTop();
    }
  }

  ngOnDestroy() {
    this.keySubscription.unsubscribe();
  }
}
