import { Component, EventEmitter, Input, Output } from 'angular2/core';

@Component({
  selector: 'tag-input-item',
  template: require('./tag-input-item.html'),
  styles: [require('./tag-input-item.scss')],
  host: {
    '[class.ng2-tag-input-item-selected]': 'selected'
  }
})
export class TagInputItemComponent {
  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter();

  constructor() { }

  removeTag() {
    this.tagRemoved.emit(this.index);
  }
}
